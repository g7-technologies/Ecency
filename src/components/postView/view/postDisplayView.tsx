import React, { useCallback, useEffect, useRef, useState, Fragment } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';

// Providers
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Utils
import { getTimeFromNow } from '../../../utils/time';

// Components
import { PostHeaderDescription, PostBody, Tags } from '../../postElements';
import { PostPlaceHolder, StickyBar, TextWithIcon, NoPost } from '../../basicUIElements';
import { Upvote } from '../../upvote';
import { IconButton } from '../../iconButton';
import { CommentsDisplay } from '../../commentsDisplay';
import { ParentPost } from '../../parentPost';

// Styles
import styles from './postDisplayStyles';
import { OptionsModal } from '../../atoms';
import getWindowDimensions from '../../../utils/getWindowDimensions';
import { useAppDispatch } from '../../../hooks';
import { showReplyModal } from '../../../redux/actions/uiAction';
import postTypes from '../../../constants/postTypes';
import { useUserActivityMutation } from '../../../providers/queries/pointQueries';
import { PointActivityIds } from '../../../providers/ecency/ecency.types';

const HEIGHT = getWindowDimensions().height;
const WIDTH = getWindowDimensions().width;

const PostDisplayView = ({
  currentAccount,
  isLoggedIn,
  isNewPost,
  fetchPost,
  handleOnEditPress,
  handleOnVotersPress,
  handleOnReblogsPress,
  post,
  intl,
  parentPost,
  isPostUnavailable,
  author,
  handleOnRemovePress,
  activeVotes,
  reblogs,
  activeVotesCount,
}) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const userActivityMutation = useUserActivityMutation();

  const commentsRef = useRef<CommentsDisplay>();
  const scrollRef = useRef<ScrollView>();
  const commentsReached = useRef<boolean>(false);

  const [postHeight, setPostHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [cacheVoteIcrement, setCacheVoteIcrement] = useState(0);
  const [isLoadedComments, setIsLoadedComments] = useState(false);
  const actionSheet = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [postBodyLoading, setPostBodyLoading] = useState(false);
  const [tags, setTags] = useState([]);

  // Component Life Cycles
  useEffect(() => {
    if (isLoggedIn && get(currentAccount, 'name') && !isNewPost) {
      // track user activity for view post
      userActivityMutation.mutate({
        pointsTy: PointActivityIds.VIEW_POST,
      });
    }
  }, []);

  useEffect(() => {
    if (post) {
      const _tags = get(post.json_metadata, 'tags', []);
      if (post.category && _tags[0] !== post.category && Array.isArray(_tags)) {
        _tags.splice(0, 0, post.category);
      }
      setTags(_tags);
    }
  }, [post]);

  // Component Functions
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPost().then(() => setRefreshing(false));
  }, [refreshing]);

  const _handleOnScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    console.log('scroll height', y);
    setScrollHeight(HEIGHT + y);

    const _commentButtonBounceOffset = y + HEIGHT / 1.7;
    if (
      !commentsReached.current &&
      commentsRef.current &&
      _commentButtonBounceOffset > postHeight
    ) {
      commentsRef.current.bounceCommentButton();
      commentsReached.current = true;
    }
  };

  const _handleOnPostLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    console.log('post height', height);
    setPostHeight(height);
  };

  const _scrollToComments = () => {
    if (scrollRef.current) {
      const pos = postHeight;
      scrollRef.current.scrollTo({ y: pos });
    }
  };

  const _handleOnReblogsPress = () => {
    if (reblogs.length > 0 && handleOnReblogsPress) {
      handleOnReblogsPress();
    }
  };

  const _handleCacheVoteIncrement = () => {
    setCacheVoteIcrement(1);
  };

  const _getTabBar = (isFixedFooter = false) => {
    return (
      <StickyBar isFixedFooter={isFixedFooter} style={styles.stickyBar}>
        <View style={[styles.stickyWrapper, { paddingBottom: insets.bottom ? insets.bottom : 8 }]}>
          <Upvote
            activeVotes={activeVotes}
            isShowPayoutValue
            content={post}
            handleCacheVoteIncrement={_handleCacheVoteIncrement}
            parentType={parentPost ? postTypes.COMMENT : postTypes.POST}
            boldPayout={true}
          />
          <TextWithIcon
            iconName="heart-outline"
            iconStyle={styles.barIcons}
            iconType="MaterialCommunityIcons"
            isClickable
            onPress={() => handleOnVotersPress && handleOnVotersPress()}
            text={activeVotesCount + cacheVoteIcrement}
            textMarginLeft={20}
          />
          <TextWithIcon
            iconName="repeat"
            iconStyle={styles.barIcons}
            iconType="MaterialIcons"
            isClickable
            onPress={_handleOnReblogsPress}
            text={reblogs.length}
            textMarginLeft={20}
          />
          {isLoggedIn && (
            <TextWithIcon
              iconName="comment-outline"
              iconStyle={styles.barIcons}
              iconType="MaterialCommunityIcons"
              isClickable
              text={get(post, 'children', 0)}
              textMarginLeft={20}
              onLongPress={_showQuickReplyModal}
              onPress={() => _scrollToComments()}
            />
          )}
          {!isLoggedIn && (
            <TextWithIcon
              iconName="comment-outline"
              iconStyle={styles.barIcons}
              iconType="MaterialCommunityIcons"
              isClickable
              text={get(post, 'children', 0)}
              textMarginLeft={20}
            />
          )}
          <View style={styles.stickyRightWrapper}>
            {get(currentAccount, 'name') === get(post, 'author') && (
              <Fragment>
                {!get(post, 'children') && !activeVotes.length && (
                  <IconButton
                    iconStyle={styles.barIconRight}
                    iconType="MaterialIcons"
                    name="delete-forever"
                    onPress={() => actionSheet.current.show()}
                    style={styles.barIconButton}
                  />
                )}
                <IconButton
                  iconStyle={styles.barIconRight}
                  iconType="MaterialIcons"
                  name="create"
                  onPress={() => handleOnEditPress && handleOnEditPress()}
                  style={styles.barIconButton}
                />
              </Fragment>
            )}
          </View>
        </View>
      </StickyBar>
    );
  };

  const { name } = currentAccount;

  // const isPostEnd = scrollHeight > postHeight;
  const isGetComment = scrollHeight + 300 > postHeight;
  const formatedTime = post && getTimeFromNow(post.created);

  if (isGetComment && !isLoadedComments) {
    setIsLoadedComments(true);
  }

  if (isPostUnavailable) {
    return (
      <NoPost
        imageStyle={styles.noPostImage}
        defaultText={`${intl.formatMessage({
          id: 'post.removed_hint',
        })}`}
      />
    );
  }

  const _handleOnPostBodyLoad = () => {
    setPostBodyLoading(false);
  };

  // show quick reply modal
  const _showQuickReplyModal = (_post = post) => {
    if (isLoggedIn) {
      dispatch(showReplyModal(_post));
    } else {
      console.log('Not LoggedIn');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent]}
        onScroll={(event) => _handleOnScroll(event)}
        scrollEventThrottle={16}
        overScrollMode="never"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ width: WIDTH }}>
          {parentPost && <ParentPost post={parentPost} />}

          <View style={styles.header}>
            {!post ? (
              <PostPlaceHolder />
            ) : (
              <View onLayout={(event) => _handleOnPostLayout(event)}>
                {!!post.title && <Text style={styles.title}>{post.title}</Text>}
                <PostHeaderDescription
                  date={formatedTime}
                  name={author || post.author}
                  currentAccountUsername={name}
                  reputation={post.author_reputation}
                  size={40}
                  inlineTime={true}
                  customStyle={styles.headerLine}
                />
                <PostBody body={post.body} onLoadEnd={_handleOnPostBodyLoad} />
                {!postBodyLoading && (
                  <View style={styles.footer}>
                    <Tags tags={tags} />
                    <Text style={styles.footerText}>
                      Posted by
                      <Text style={styles.footerName}>{` ${author || post.author} `}</Text>
                      {formatedTime}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          {post && !postBodyLoading && (isGetComment || isLoadedComments) && (
            <CommentsDisplay
              ref={commentsRef}
              author={author || post.author}
              mainAuthor={author || post.author}
              permlink={post.permlink}
              commentCount={post.children}
              fetchPost={fetchPost}
              handleOnVotersPress={handleOnVotersPress}
              handleOnReplyPress={_showQuickReplyModal}
              fetchedAt={post.post_fetched_at}
            />
          )}
        </View>
      </ScrollView>
      {post && _getTabBar(true)}
      <OptionsModal
        ref={actionSheet}
        options={[
          intl.formatMessage({ id: 'alert.delete' }),
          intl.formatMessage({ id: 'alert.cancel' }),
        ]}
        title={intl.formatMessage({ id: 'alert.remove_alert' })}
        cancelButtonIndex={1}
        onPress={(index) => (index === 0 ? handleOnRemovePress(get(post, 'permlink')) : null)}
      />
    </View>
  );
};

export default injectIntl(PostDisplayView);
