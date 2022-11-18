import { QuoteItem } from '../../redux/reducers/walletReducer';

export interface ReceivedVestingShare {
  delegator: string;
  delegatee: string;
  vesting_shares: string;
  timestamp: string;
}

export interface MediaItem {
  _id: string;
  url: string;
  created: string;
  timestamp: number;
}

export interface Snippet {
  id: string;
  title: string;
  body: string;
  created: string;
  modified: string;
}

export interface EcencyUser {
  username: string;
  points: string;
  unclaimed_points: string;
  points_by_type: { [key: string]: string };
  unclaimed_points_by_type: { [key: string]: string };
}

export interface Referral {
  id: number;
  referral: string;
  rewarded: boolean;
  username: string;
  created: string;
}

export interface ReferralStat {
  total: number;
  rewarded: number;
}

export interface UserPoint {
  id: number;
  type: number;
  amount: string;
  created: string;
  memo?: string;
  receiver?: string;
  sender?: string;
}

export interface LatestQuotes {
  [key: string]: QuoteItem;
}

export interface CommentHistoryItem {
  body: string;
  tags: [string];
  title: string;
  timestamp: string;
  v: number;
}

export interface PointActivity {
  pointsTy: number;
  username?: string;
  transactionId?: string;
  blockNum?: number | string;
}

export enum ScheduledPostStatus {
  PENDING = 1,
  POSTPONED = 2,
  PUBLISHED = 3,
  ERROR = 4,
}

export enum NotificationFilters {
  ACTIVITIES = 'activities',
  RVOTES = 'rvotes',
  MENTIONS = 'mentions',
  FOLLOWS = 'follows',
  REPLIES = 'replies',
  REBLOGS = 'reblogs',
  TRANFERS = 'transfers',
  DELEGATIONS = 'delegations',
  FAVOURITES = 'nfavorites',
  BOOKMARKS = 'nbookmarks',
}

export enum PointActivityIds {
  VIEW_POST = 10,
  LOGIN = 20,
  POST = 100,
  COMMENT = 110,
  VOTE = 120,
  REBLOG = 130,
}
