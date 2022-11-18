import EStyleSheet from 'react-native-extended-stylesheet';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default EStyleSheet.create({
  sheetContent: {
    backgroundColor: '$primaryBackgroundColor',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  thumbStyle: {
    width: 72,
    height: 72,
    marginVertical: 8,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '$primaryLightGray',
  },
  checkContainer: {
    position: 'absolute',
    top: 12,
    left: 6,
    backgroundColor: '$pureWhite',
    borderRadius: 12,
  },
  settingLabel: {
    color: '$primaryDarkGray',
    fontSize: 14,
    fontWeight: 'bold',
    flexGrow: 1,
    textAlign: 'left',
  },
  listContainer: {
    paddingBottom: getBottomSpace() + 16,
  },
  container: {
    paddingVertical: 16,
  },
  bodyWrapper: { flex: 1, paddingTop: 20, paddingBottom: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center' },
  contentLabel: { color: '$iconColor', marginTop: 4, textAlign: 'left' },
  weightInput: { width: 80 },
  weightFormInput: { flex: 1, color: '$primaryBlack', paddingLeft: 12 },
  weightFormInputWrapper: { marginTop: 8 },
  usernameInput: { flex: 1, color: '$primaryBlack', marginLeft: 16 },
  usernameFormInputWrapper: { marginTop: 8, marginRight: 12 },
  footerWrapper: { paddingTop: 16 },
  saveButton: {
    width: 140,
    height: 44,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  doneButton: { borderRadius: 16, backgroundColor: '$primaryBlue' },
  thumbSelectContainer: {
    marginTop: 12,
  },
});
