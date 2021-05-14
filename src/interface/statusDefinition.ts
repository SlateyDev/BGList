export interface StatusDefinition {
  fortrade: boolean;
  lastmodified: Date;
  own: boolean;
  preordered: boolean;
  prevowned: boolean;
  want: boolean;
  wanttobuy: boolean;
  wanttoplay: boolean;
  wishlist: boolean;
  wishlistpriority: number | undefined;
}
