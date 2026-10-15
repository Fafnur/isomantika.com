import { computed, Directive, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'is-primary border-transparent bg-gold text-on-gold hover:bg-gold/90',
  secondary: 'is-secondary border-outline text-text-primary hover:border-gold',
  ghost: 'is-ghost border-transparent text-gold hover:bg-gold/10',
};

/**
 * Button styles on a native `<button>` or `<a>`: semantics and keyboard behaviour stay native.
 *
 * @usageNotes
 * ```html
 * <button mkButton type="submit">Send</button>
 * <a mkButton variant="secondary" href="/support/">Support</a>
 * ```
 */
@Directive({
  selector: 'button[mkButton], a[mkButton]',
  host: {
    class:
      'inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-text text-base font-semibold leading-tight no-underline transition-colors hover:no-underline disabled:pointer-events-none disabled:opacity-50',
    '[class]': '$variantClasses()',
  },
})
export class Button {
  readonly $variant = input<ButtonVariant>('primary', { alias: 'variant' });

  protected readonly $variantClasses = computed(() => VARIANT_CLASSES[this.$variant()]);
}
