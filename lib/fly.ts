/** Foto produk meluncur ke ikon keranjang yang sedang tampil, lalu ikon berdenyut. */
export function flyToCart(img: HTMLImageElement | null) {
  const target = [...document.querySelectorAll<HTMLElement>(".bag, .tabbar button")].find((e) => e.getClientRects().length);
  if (!img || !target || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const a = img.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const dot = new Image();
  dot.src = img.currentSrc || img.src;
  dot.className = "fly";
  dot.style.left = `${a.left + a.width / 2 - 28}px`;
  dot.style.top = `${a.top + a.height / 2 - 28}px`;
  document.body.append(dot);

  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  dot
    .animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 70}px) scale(0.7)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.5 },
      ],
      { duration: 700, easing: "cubic-bezier(0.4, 0, 0.6, 1)" },
    )
    .finished.then(() => {
      dot.remove();
      target.animate([{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(1)" }], { duration: 300 });
    });
}
