import { Component, computed, input } from '@angular/core';

export type SpreadType = 'daily' | 'three' | 'cross';

interface Slot {
  readonly label: string;
  /** `grid-area: row / column` in a 3×3 grid. */
  readonly area: string;
}

/**
 * Card positions of a spread, drawn with card backs: the layout, not the cards.
 */
@Component({
  selector: 'imk-spread-diagram',
  templateUrl: './spread-diagram.html',
  host: { class: 'block' },
})
export class SpreadDiagram {
  readonly $type = input.required<SpreadType>({ alias: 'type' });

  protected readonly $slots = computed<Slot[]>(() => {
    switch (this.$type()) {
      case 'daily':
        return [{ label: '1', area: '2 / 2' }];
      case 'three':
        return [
          { label: '1', area: '2 / 1' },
          { label: '2', area: '2 / 2' },
          { label: '3', area: '2 / 3' },
        ];
      case 'cross':
        return [
          { label: '1', area: '1 / 2' },
          { label: '2', area: '2 / 1' },
          { label: '3', area: '2 / 3' },
          { label: '4', area: '3 / 2' },
        ];
    }
  });
}
