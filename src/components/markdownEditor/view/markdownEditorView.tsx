import React, { useState, useRef, useEffect, useCallback, Fragment } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { renderPostBody, postBodySummary } from '@ecency/render-helper';
import { useDispatch, useSelector } from 'react-redux';
import { View as AnimatedView } from 'react-native-animatable';
import { get, debounce } from 'lodash';
import { Icon } from '../../icon';

// Utils
import applyMediaLink from '../children/formats/applyMediaLink';

// Actions
import { toggleAccountsBottomSheet } from '../../../redux/actions/uiAction';

// Components
import {
  PostBody,
  TextInput,
  UserAvatar,
  TitleArea,
  TagArea,
  TagInput,
  SummaryArea,
  Modal,
  SnippetsModal,
  Tooltip,
  InsertLinkModal,
} from '../../index';

// Styles
import styles from '../styles/markdownEditorStyles';
import applySnippet from '../children/formats/applySnippet';
import { MainButton } from '../../mainButton';
import isAndroidOreo from '../../../utils/isAndroidOreo';
import { OptionsModal } from '../../atoms';
import { UsernameAutofillBar } from '../children/usernameAutofillBar';
import applyUsername from '../children/formats/applyUsername';
import { walkthrough } from '../../../redux/constants/walkthroughConstants';
import { MediaInsertData } from '../../uploadsGalleryModal/container/uploadsGalleryModal';
import { EditorToolbar } from '../children/editorToolbar';
import { extractImageUrls } from '../../../utils/editor';
import { useAppSelector } from '../../../hooks';

// const MIN_BODY_INPUT_HEIGHT = 300;

// These variable keep track of body text input state,
// this helps keep load on minimal compared to both useState and useRef;
let bodyText = '';
let bodySelection = { start: 0, end: 0 };

const MarkdownEditorView = ({
  paramFiles,
  draftBody,
  intl,
  isPreviewActive,
  isReply,
  isLoading,
  initialFields,
  onChange,
  isEdit,
  post,
  fields,
  onTagChanged,
  onTitleChanged,
  getCommunity,
  currentAccount,
  autoFocusText,
  sharedSnippetText,
  onLoadDraftPress,
  setIsUploading,
}) => {
  const dispatch = useDispatch();

  const isDarkTheme = useAppSelector((state) => state.application.isDarkTheme);

  const [editable, setEditable] = useState(true);
  // const [bodyInputHeight, setBodyInputHeight] = useState(MIN_BODY_INPUT_HEIGHT);
  const [isSnippetsOpen, setIsSnippetsOpen] = useState(false);
  const [showDraftLoadButton, setShowDraftLoadButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [insertedMediaUrls, setInsertedMediaUrls] = useState([]);

  const inputRef = useRef<any>(null);
  const clearRef = useRef<any>(null);
  const insertLinkModalRef = useRef<any>(null);
  const tooltipRef = useRef<any>(null);

  const isVisibleAccountsBottomSheet = useSelector(
    (state) => state.ui.isVisibleAccountsBottomSheet,
  );
  const draftBtnTooltipState = useSelector((state) => state.walkthrough.walkthroughMap);
  const draftBtnTooltipRegistered = draftBtnTooltipState.get(walkthrough.EDITOR_DRAFT_BTN);
  const headerText = post && (post.summary || postBodySummary(post, 150, Platform.OS));

  useEffect(() => {
    bodyText = '';
    bodySelection = { start: 0, end: 0 };
  }, []);

  useEffect(() => {
    if (!isPreviewActive) {
      _setTextAndSelection({ selection: bodySelection, text: bodyText });
    }
  }, [isPreviewActive]);

  useEffect(() => {
    if (onLoadDraftPress) {
      setShowDraftLoadButton(true);
      if (!draftBtnTooltipRegistered) {
        setTimeout(() => {
          tooltipRef.current?.openTooltip();
        }, 300);
      }
    }
  }, [onLoadDraftPress]);

  useEffect(() => {
    if (bodyText === '' && draftBody !== '') {
      const draftBodyLength = draftBody.length;
      _setTextAndSelection({
        selection: { start: draftBodyLength, end: draftBodyLength },
        text: draftBody,
      });
    }
  }, [draftBody]);

  useEffect(() => {
    // hide draft button if fields changes and button was visible
    if (showDraftLoadButton) {
      const isCreating =
        get(fields, 'title', '') !== '' ||
        get(fields, 'body', '') !== '' ||
        get(fields, 'tags', []) !== [];

      if (isCreating) {
        setShowDraftLoadButton(false);
      }
    }
  }, [fields]);

  useEffect(() => {
    if (sharedSnippetText) {
      _handleOnSnippetReceived(sharedSnippetText);
    }
  }, [sharedSnippetText]);

  useEffect(() => {
    if (editable === null) {
      // workaround for android context menu issue
      setEditable(false);
      setTimeout(() => {
        setEditable(!isLoading);
      }, 100);
    } else {
      setEditable(!isLoading);
    }
  }, [isLoading]);

  useEffect(() => {
    bodyText = draftBody;
  }, [draftBody]);

  useEffect(() => {
    if (isReply || (autoFocusText && inputRef && inputRef.current && draftBtnTooltipRegistered)) {
      // added delay to open keyboard, solves the issue of keyboard not opening
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 1000);
    }
  }, [autoFocusText]);

  const changeUser = async () => {
    dispatch(toggleAccountsBottomSheet(!isVisibleAccountsBottomSheet));
  };

  const _onApplyUsername = (username) => {
    applyUsername({
      text: bodyText,
      selection: bodySelection,
      setTextAndSelection: _setTextAndSelection,
      username,
    });
  };

  const _debouncedOnTextChange = useCallback(
    debounce(() => {
      console.log('setting is editing to', false);
      setIsEditing(false);
      const urls = extractImageUrls({ body: bodyText });
      if (urls.length !== insertedMediaUrls.length) {
        setInsertedMediaUrls(urls);
      }
    }, 500),
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _changeText = useCallback(
    (input) => {
      bodyText = input;

      if (!isEditing) {
        console.log('force setting is editing to true', true);
        setIsEditing(true);
      }

      _debouncedOnTextChange();

      // NOTE: onChange method is called by direct parent of MarkdownEditor that is PostForm, do not remove
      if (onChange) {
        onChange(input);
      }
    },
    [isEditing],
  );

  const _handleOnSelectionChange = async (event) => {
    bodySelection = event.nativeEvent.selection;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _setTextAndSelection = useCallback(({ selection: _selection, text: _text }) => {
    // console.log('_text : ', _text);
    inputRef?.current?.setNativeProps({
      text: _text,
    });

    const _updateSelection = () => {
      bodySelection = _selection;
      inputRef?.current?.setNativeProps({
        selection: _selection,
      });
    };

    // Workaround for iOS selection update issue
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        _updateSelection();
      }, 100);
    } else {
      _updateSelection();
    }

    if (isSnippetsOpen) {
      setIsSnippetsOpen(false);
    }

    _changeText(_text);
  }, []);

  const _renderPreview = () => (
    <ScrollView style={styles.previewContainer}>
      {bodyText ? (
        <PostBody body={renderPostBody(bodyText, true, Platform.OS !== 'ios')} />
      ) : (
        <Text>...</Text>
      )}
    </ScrollView>
  );

  const _handleOnSnippetReceived = (snippetText) => {
    applySnippet({
      text: bodyText,
      selection: bodySelection,
      setTextAndSelection: _setTextAndSelection,
      snippetText: `\n${snippetText}\n`,
    });
    setIsSnippetsOpen(false);
  };

  const _handleMediaInsert = (mediaArray: MediaInsertData[]) => {
    if (mediaArray.length) {
      applyMediaLink({
        text: bodyText,
        selection: bodySelection,
        setTextAndSelection: _setTextAndSelection,
        items: mediaArray,
      });
    }
  };

  const _handleOnAddLinkPress = () => {
    insertLinkModalRef.current?.showModal({
      selectedText: bodyText.slice(bodySelection.start, bodySelection.end),
      selection: bodySelection,
    });
    inputRef?.current?.blur();
  };

  const _handleOnAddLinkSheetClose = () => {
    inputRef?.current?.focus();
  };

  const _handleInsertLink = ({ snippetText, selection }) => {
    applySnippet({
      text: bodyText,
      selection,
      setTextAndSelection: _setTextAndSelection,
      snippetText,
    });

    insertLinkModalRef.current?.hideModal();
  };

  const _renderFloatingDraftButton = () => {
    if (showDraftLoadButton) {
      const _onPress = () => {
        setShowDraftLoadButton(false);
        onLoadDraftPress();
      };

      const Wrapper = draftBtnTooltipRegistered ? AnimatedView : View;
      return (
        <>
          <Wrapper style={styles.floatingContainer} animation="bounceInRight">
            <Tooltip
              ref={tooltipRef}
              text={intl.formatMessage({ id: 'walkthrough.load_draft_tooltip' })}
              walkthroughIndex={walkthrough.EDITOR_DRAFT_BTN}
            >
              <MainButton
                style={{ width: isLoading ? null : 120 }}
                onPress={_onPress}
                iconName="square-edit-outline"
                iconType="MaterialCommunityIcons"
                iconColor="white"
                text="DRAFT"
                isLoading={isLoading}
              />
            </Tooltip>
          </Wrapper>
        </>
      );
    }
  };

  const _handleClear = (index) => {
    if (index === 0) {
      initialFields();

      _setTextAndSelection({ text: '', selection: { start: 0, end: 0 } });
    }
  };
  const _renderEditor = (editorScrollEnabled: boolean) => (
    <>
      {isReply && !isEdit && <SummaryArea summary={headerText} />}
      {!isReply && (
        <TitleArea value={fields.title} onChange={onTitleChanged} componentID="title" intl={intl} />
      )}
      {!isReply && !isPreviewActive && (
        <TagInput
          value={fields.tags}
          componentID="tag-area"
          intl={intl}
          handleTagChanged={onTagChanged}
          setCommunity={getCommunity}
        />
      )}
      {!isReply && isPreviewActive && (
        <TagArea
          draftChips={fields.tags.length > 0 ? fields.tags : null}
          componentID="tag-area"
          intl={intl}
          isPreviewActive={isPreviewActive}
        />
      )}
      {isReply && (
        <View style={styles.replySection}>
          <TouchableOpacity style={styles.accountTile} onPress={() => changeUser()}>
            <View style={styles.avatarAndNameContainer}>
              <UserAvatar noAction username={currentAccount.username} />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{`@${currentAccount.username}`}</Text>
              </View>
              <Icon
                size={24}
                iconStyle={styles.leftIcon}
                style={styles.iconArrow}
                name="arrow-drop-down"
                iconType="MaterialIcons"
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {!isPreviewActive ? (
        <TextInput
          multiline
          autoCorrect={true}
          autoFocus={!!draftBtnTooltipRegistered}
          onChangeText={_changeText}
          onSelectionChange={_handleOnSelectionChange}
          placeholder={intl.formatMessage({
            id: isReply ? 'editor.reply_placeholder' : 'editor.default_placeholder',
          })}
          placeholderTextColor={isDarkTheme ? '#526d91' : '#c1c5c7'}
          selectionColor="#357ce6"
          style={styles.textWrapper}
          underlineColorAndroid="transparent"
          innerRef={inputRef}
          editable={editable}
          contextMenuHidden={false}
          scrollEnabled={editorScrollEnabled}
        />
      ) : (
        _renderPreview()
      )}
    </>
  );

  const _editorWithScroll = (
    <ScrollView style={styles.container}>{_renderEditor(false)}</ScrollView>
  );
  const _editorWithoutScroll = <View style={styles.container}>{_renderEditor(true)}</View>;

  const _renderContent = () => {
    const _innerContent = (
      <>
        {isAndroidOreo() ? _editorWithoutScroll : _editorWithScroll}
        <UsernameAutofillBar
          text={bodyText}
          selection={bodySelection}
          onApplyUsername={_onApplyUsername}
        />
        {_renderFloatingDraftButton()}

        <EditorToolbar
          insertedMediaUrls={insertedMediaUrls}
          isPreviewActive={isPreviewActive}
          paramFiles={paramFiles}
          setIsUploading={setIsUploading}
          handleMediaInsert={_handleMediaInsert}
          handleOnAddLinkPress={_handleOnAddLinkPress}
          handleShowSnippets={() => setIsSnippetsOpen(true)}
          handleOnClearPress={() => clearRef.current.show()}
          handleOnMarkupButtonPress={(item) => {
            item.onPress({
              text: bodyText,
              selection: bodySelection,
              setTextAndSelection: _setTextAndSelection,
              item,
            });
          }}
        />
      </>
    );

    return Platform.select({
      ios: (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {_innerContent}
        </KeyboardAvoidingView>
      ),
      android: <View style={styles.container}>{_innerContent}</View>,
    });
  };

  return (
    <Fragment>
      {_renderContent()}

      <Modal
        isOpen={isSnippetsOpen}
        handleOnModalClose={() => setIsSnippetsOpen(false)}
        isFullScreen
        isCloseButton
        presentationStyle="formSheet"
        title={intl.formatMessage({ id: 'editor.snippets' })}
        animationType="slide"
        style={styles.modalStyle}
      >
        <SnippetsModal handleOnSelect={_handleOnSnippetReceived} />
      </Modal>

      <InsertLinkModal
        ref={insertLinkModalRef}
        handleOnInsertLink={_handleInsertLink}
        handleOnSheetClose={_handleOnAddLinkSheetClose}
      />

      <OptionsModal
        ref={clearRef}
        title={intl.formatMessage({
          id: 'alert.clear_alert',
        })}
        options={[
          intl.formatMessage({
            id: 'alert.clear',
          }),
          intl.formatMessage({
            id: 'alert.cancel',
          }),
        ]}
        cancelButtonIndex={1}
        onPress={_handleClear}
      />
    </Fragment>
  );
};

export default MarkdownEditorView;
