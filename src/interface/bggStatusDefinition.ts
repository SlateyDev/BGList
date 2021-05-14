export interface BggStatusDefinition {
  forTrade: boolean;
  lastModified: Date;
  own: boolean;
  preOrdered: boolean;
  previouslyOwned: boolean;
  want: boolean;
  wantToBuy: boolean;
  wantToPlay: boolean;
  wishlist: boolean;
  wishlistPriority: number | undefined;
}
