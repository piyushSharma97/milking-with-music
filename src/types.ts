/** Describes a selectable audio track and its artwork. */
export interface Track {
  title: string;
  src: string;
  thumbnail: string;
}

/** Describes one saved milking session using the existing storage format. */
export interface MilkingSession {
  date: string;
  startTime: string;
  endTime: string;
  milkQuantity: string;
}
