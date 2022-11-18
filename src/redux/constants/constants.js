export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const SET_USER_DATA = 'SET_USER_DATA';

// Applicaiton
export const IS_CONNECTED = 'IS_CONNECTED';
export const IS_DARK_THEME = 'IS_DARK_THEME';
export const IS_PIN_CODE_OPEN = 'IS_PIN_CODE_OPEN';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const IS_LOGIN_DONE = 'IS_LOGIN_DONE';
export const IS_NOTIFICATION_OPEN = 'IS_NOTIFICATION_OPEN';
export const IS_DEFAULT_FOOTER = 'IS_DEFAULT_FOOTER';
export const IS_RENDER_REQUIRED = 'IS_RENDER_REQUIRED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_DONE = 'LOGOUT_DONE';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_API = 'SET_API';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_POST_UPVOTE_PERCENT = 'SET_POST_UPVOTE_PERCENT';
export const SET_COMMENT_UPVOTE_PERCENT = 'SET_COMMENT_UPVOTE_PERCENT';
export const SET_NSFW = 'SET_NSFW';
export const CHANGE_FOLLOW_NOTIFICATION = 'CHANGE_FOLLOW_NOTIFICATION';
export const CHANGE_VOTE_NOTIFICATION = 'CHANGE_VOTE_NOTIFICATION';
export const CHANGE_COMMENT_NOTIFICATION = 'CHANGE_COMMENT_NOTIFICATION';
export const CHANGE_MENTION_NOTIFICATION = 'CHANGE_MENTION_NOTIFICATION';
export const CHANGE_FAVORITE_NOTIFICATION = 'CHANGE_FAVORITE_NOTIFICATION';
export const CHANGE_BOOKMARK_NOTIFICATION = 'CHANGE_BOOKMARK_NOTIFICATION';
export const CHANGE_REBLOG_NOTIFICATION = 'CHANGE_REBLOG_NOTIFICATION';
export const CHANGE_TRANSFERS_NOTIFICATION = 'CHANGE_TRANSFERS_NOTIFICATION';
export const CHANGE_ALL_NOTIFICATION_SETTINGS = 'CHANGE_ALL_NOTIFICATION_SETTINGS';
export const SET_LAST_APP_VERSION = 'SET_LAST_APP_VERSION';
export const SET_COLOR_THEME = 'SET_COLOR_THEME';
export const SET_SETTINGS_MIGRATED = 'SET_SETTINGS_MIGRATED';
export const SET_TERMS_ACCEPTED = 'SET_TERMS_ACCEPTED';
export const SET_IS_BIOMETRIC_ENABLED = 'SET_IS_BIOMETRIC_ENABLED';
export const SET_ENC_UNLOCK_PIN = 'SET_ENC_UNLOCK_PIN';

// Accounts
export const ADD_OTHER_ACCOUNT = 'ADD_OTHER_ACCOUNT';
export const FETCH_ACCOUNT_FAIL = 'FETCH_ACCOUNT_FAIL';
export const FETCHING_ACCOUNT = 'FETCHING_ACCOUNT';
export const REMOVE_OTHER_ACCOUNT = 'REMOVE_OTHER_ACCOUNT';
export const REMOVE_ALL_OTHER_ACCOUNT = 'REMOVE_ALL_OTHER_ACCOUNT';
export const UPDATE_CURRENT_ACCOUNT = 'UPDATE_CURRENT_ACCOUNT';
export const UPDATE_UNREAD_ACTIVITY_COUNT = 'UPDATE_UNREAD_ACTIVITY_COUNT';
export const SET_PIN_CODE = 'SET_PIN_CODE';
export const SET_GLOBAL_PROPS = 'SET_GLOBAL_PROPS';
export const FETCH_GLOBAL_PROPS = 'FETCH_GLOBAL_PROPS';

// UI
export const UPDATE_ACTIVE_BOTTOM_TAB = 'UPDATE_ACTIVE_BOTTOM_TAB';
export const TOAST_NOTIFICATION = 'TOAST_NOTIFICATION';
export const HIDE_POSTS_THUMBNAILS = 'HIDE_POSTS_THUMBNAILS';
export const RC_OFFER = 'RC_OFFER';
export const TOGGLE_ACCOUNTS_BOTTOM_SHEET = 'TOGGLE_ACCOUNTS_BOTTOM_SHEET';
export const TOGGLE_QR_MODAL = 'TOGGLE_QR_MODAL';
export const SHOW_ACTION_MODAL = 'SHOW_ACTION_MODAL';
export const HIDE_ACTION_MODAL = 'HIDE_ACTION_MODAL';
export const SET_AVATAR_CACHE_STAMP = 'SET_AVATAR_CACHE_STAMP';
export const SHOW_PROFILE_MODAL = 'SHOW_PROFILE_MODAL';
export const HIDE_PROFILE_MODAL = 'HIDE_PROFILE_MODAL';
export const SET_DEVICE_ORIENTATION = 'SET_DEVICE_ORIENTATION';
export const SET_LOCKED_ORIENTATION = 'SET_LOCKED_ORIENTATION';
export const SHOW_REPLY_MODAL = 'SHOW_REPLY_MODAL';
export const HIDE_REPLY_MODAL = 'HIDE_REPLY_MODAL';

// POSTS
export const SET_FEED_POSTS = 'SET_FEED_POSTS';
export const SET_OTHER_POSTS = 'SET_OTHER_POSTS';
export const SET_INIT_POSTS = 'SET_INIT_POSTS';
export const FILTER_SELECTED = 'FILTER_SELECTED';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const RESET = 'RESET';
export const SET_FEED_SCREEN_FILTERS = 'SET_FEED_SCREEN_FILTERS';

// COMMUNITIES
export const FETCH_COMMUNITIES = 'FETCH_COMMUNITIES';
export const FETCH_COMMUNITIES_SUCCESS = 'FETCH_COMMUNITIES_SUCCESS';
export const FETCH_COMMUNITIES_FAIL = 'FETCH_COMMUNITIES_FAIL';
export const FETCH_SUBSCRIBED_COMMUNITIES = 'FETCH_SUBSCRIBED_COMMUNITIES';
export const FETCH_SUBSCRIBED_COMMUNITIES_SUCCESS = 'FETCH_SUBSCRIBED_COMMUNITIES_SUCCESS';
export const FETCH_SUBSCRIBED_COMMUNITIES_FAIL = 'FETCH_SUBSCRIBED_COMMUNITIES_FAIL';
export const SUBSCRIBE_COMMUNITY = 'SUBSCRIBE_COMMUNITY';
export const SUBSCRIBE_COMMUNITY_SUCCESS = 'SUBSCRIBE_COMMUNITY_SUCCESS';
export const SUBSCRIBE_COMMUNITY_FAIL = 'SUBSCRIBE_COMMUNITY_FAIL';
export const LEAVE_COMMUNITY = 'LEAVE_COMMUNITY';
export const LEAVE_COMMUNITY_SUCCESS = 'LEAVE_COMMUNITY_SUCCESS';
export const LEAVE_COMMUNITY_FAIL = 'LEAVE_COMMUNITY_FAIL';

// USER
export const FOLLOW_USER = 'FOLLOW_USER';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAIL = 'UNFOLLOW_USER_FAIL';
export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAIL = 'FETCH_LEADERBOARD_FAIL';

// CUSTOM TABS
export const SET_MAIN_TABS = 'SET_MAIN_TABS';
export const SET_COMMUNITY_TABS = 'SET_COMMUNITY_TABS';
export const SET_PROFILE_TABS = 'SET_PROFILE_TABS';
export const SET_OWN_PROFILE_TABS = 'SET_OWN_PROFILE_TABS';

// EDITOR
export const SET_BENEFICIARIES = 'SET_BENEFICIARIES';
export const REMOVE_BENEFICIARIES = 'REMOVE_BENEFICIARIES';
export const TEMP_BENEFICIARIES_ID = 'temp-beneficiaries';

// CACHE
export const PURGE_EXPIRED_CACHE = 'PURGE_EXPIRED_CACHE';
export const UPDATE_VOTE_CACHE = 'UPDATE_VOTE_CACHE';
export const UPDATE_COMMENT_CACHE = 'UPDATE_COMMENT_CACHE';
export const DELETE_COMMENT_CACHE_ENTRY = 'DELETE_COMMENT_CACHE_ENTRY';
export const UPDATE_DRAFT_CACHE = 'UPDATE_DRAFT_CACHE';
export const DELETE_DRAFT_CACHE_ENTRY = 'DELETE_DRAFT_CACHE_ENTRY';
export const DEFAULT_USER_DRAFT_ID = 'DEFAULT_USER_DRAFT_ID_';
export const UPDATE_SUBSCRIBED_COMMUNITY_CACHE = 'UPDATE_SUBSCRIBED_COMMUNITY_CACHE';
export const DELETE_SUBSCRIBED_COMMUNITY_CACHE = 'DELETE_SUBSCRIBED_COMMUNITY_CACHE';
export const CLEAR_SUBSCRIBED_COMMUNITIES_CACHE = 'CLEAR_SUBSCRIBED_COMMUNITIES_CACHE';
export const UPDATE_POINT_ACTIVITY_CACHE = 'UPDATE_POINT_ACTIVITY_CACHE';
export const DELETE_POINT_ACTIVITY_CACHE_ENTRY = 'DELETE_POINT_ACTIVITY_CACHE_ENTRY';

// TOOLTIPS
export const REGISTER_TOOLTIP = 'REGISTER_TOOLTIP';

// WALLET
export const SET_SELECTED_COINS = 'SET_SELECTED_COINS';
export const SET_COINS_DATA = 'SET_COIN_DATA';
export const SET_PRICE_HISTORY = 'SET_PRICE_HISTORY';
export const SET_COIN_ACTIVITIES = 'SET_COIN_ACTIVITIES';
export const SET_COIN_QUOTES = 'SET_COIN_QUOTES';
export const RESET_WALLET_DATA = 'RESET_WALLET_DATA';