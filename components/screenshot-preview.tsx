'use client';

import { useId, useRef } from 'react';
import Image from 'next/image';
import type { Product, Screenshot } from '@/config/products';
import { Icon } from './icon';

/** A real product capture. Click or press Enter to see it full size.
 *  `crop` shows a close-up of the middle of a tall phone capture instead of the whole phone. */
export function ScreenshotPreview({ product, crop = false, use }: { product: Product; crop?: boolean; use?: Screenshot }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const shot = use ?? product.screenshot;
  if (!shot) return null;
  const portrait = shot.height > shot.width;

  return (
    <>
      <button className={`shot ${crop ? 'shot-crop' : portrait ? 'shot-phone' : 'shot-wide'}`} onClick={() => dialog.current?.showModal()} aria-label={`View the ${product.name} screenshot full size`}>
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={crop ? '(max-width: 900px) 92vw, 520px' : portrait ? '300px' : '(max-width: 900px) 92vw, 640px'} />
      </button>
      <dialog ref={dialog} className="shot-dialog" aria-labelledby={titleId} onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }}>
        <div className="shot-dialog-top">
          <h3 id={titleId}>{product.name}</h3>
          <button type="button" className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close screenshot"><Icon name="close" size={22} /></button>
        </div>
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="90vw" className={portrait ? 'dialog-img dialog-img-phone' : 'dialog-img'} />
        <p>{shot.caption}</p>
      </dialog>
    </>
  );
}
