import type { Product } from '@/config/products';

/** The button that opens a product. With no confirmed destination it shows an honest "coming soon" note instead. */
export function AccessLink({ product, variant = 'primary' }: { product: Product; variant?: 'primary' | 'outline' }) {
  if (!product.destinationUrl) {
    return <p className="access-pending"><span className="pending-dot" />Coming to {product.platform} soon</p>;
  }
  return (
    <a className={`button button-${variant}`} href={product.destinationUrl} target="_blank" rel="noopener noreferrer">
      {product.accessLabel}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
