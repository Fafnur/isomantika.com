import { Component, computed, input } from '@angular/core';

export type SpreadType =
  | 'daily'
  | 'yesNo'
  | 'three'
  | 'cross'
  | 'feelings'
  | 'relationship'
  | 'reconciliation'
  | 'newLove'
  | 'twoPaths'
  | 'horseshoe'
  | 'wish'
  | 'career';

/** `[column, row]` in card steps; half steps stagger a row. */
type Cell = readonly [number, number];

/** Card size and gap, px. */
const CARD_WIDTH = 28;
const CARD_HEIGHT = 42;
const GAP = 6;

/** Height of the tallest spread (three rows): diagrams of all spreads line up. */
const HEIGHT = 3 * CARD_HEIGHT + 2 * GAP;

/**
 * Where the positions of a spread lie, in drawing order: the same cells as `spreadCells` in the app
 * (`lib/core/deck/spread_cells.dart`).
 */
const CELLS: Record<SpreadType, Cell[]> = {
  daily: [[0, 0]],
  yesNo: [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  three: [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  feelings: [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  // The heart in the middle row, «don't» on the left, «do» on the right, the outcome above.
  cross: [
    [1, 1],
    [0, 1],
    [2, 1],
    [1, 0],
  ],
  // Me and the partner on the sides of the bond, what stands in the way below, the advice above.
  relationship: [
    [0, 1],
    [2, 1],
    [1, 1],
    [1, 2],
    [1, 0],
  ],
  // The situation in the middle, each path rising from it on its side, the advice above.
  twoPaths: [
    [1, 1],
    [0, 1],
    [0, 0],
    [2, 1],
    [2, 0],
    [1, 0],
  ],
  // A horseshoe opening upwards.
  horseshoe: [
    [0, 0],
    [0, 1],
    [0.5, 2],
    [1.5, 2],
    [2.5, 2],
    [3, 1],
    [3, 0],
  ],
  newLove: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  // Three above, two below.
  career: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0.5, 1],
    [1.5, 1],
  ],
  reconciliation: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0.5, 1],
    [1.5, 1],
  ],
  wish: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0.5, 1],
    [1.5, 1],
  ],
};

interface Slot {
  readonly label: string;
  readonly left: number;
  readonly top: number;
}

/**
 * Card positions of a spread, drawn as numbered card outlines: the layout, not the cards.
 */
@Component({
  selector: 'imk-spread-diagram',
  templateUrl: './spread-diagram.html',
  host: { class: 'flex items-center justify-center', '[style.height.px]': 'height' },
})
export class SpreadDiagram {
  readonly $type = input.required<SpreadType>({ alias: 'type' });

  protected readonly height = HEIGHT;
  protected readonly cardWidth = CARD_WIDTH;
  protected readonly cardHeight = CARD_HEIGHT;

  private readonly $cells = computed(() => CELLS[this.$type()]);

  protected readonly $width = computed(() => (Math.max(...this.$cells().map(([column]) => column)) + 1) * (CARD_WIDTH + GAP) - GAP);
  protected readonly $rowsHeight = computed(() => (Math.max(...this.$cells().map(([, row]) => row)) + 1) * (CARD_HEIGHT + GAP) - GAP);

  protected readonly $slots = computed<Slot[]>(() =>
    this.$cells().map(([column, row], index) => ({
      label: `${index + 1}`,
      left: column * (CARD_WIDTH + GAP),
      top: row * (CARD_HEIGHT + GAP),
    })),
  );
}
