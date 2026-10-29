/**
 * Scroll lock terpusat (reference counted).
 *
 * Kenapa tidak boleh `body.style.overflow = 'hidden'` langsung di tiap komponen:
 * bila dua komponen mengunci body (mis. OrderContext yang memegang `previewId`
 * dan `PreviewModal` yang sedang dirender), cleanup-nya bisa saling menimpa.
 * Saat modal ditutup, cleanup child mengembalikan nilai asli lebih dulu, lalu
 * cleanup parent menulis ulang `hidden` — akibatnya halaman terkunci permanen
 * walau modal sudah hilang.
 *
 * Modul ini menyimpan nilai asli SEKALI di kunci pertama, menghitung jumlah
 * pemegang kunci, dan baru melepas style saat pemegang terakhir lepas.
 */

let lockCount = 0
let originalOverflow = ''
let originalPaddingRight = ''

/**
 * Kunci scroll halaman.
 * @returns {() => void} fungsi release (idempoten, aman dipanggil berkali-kali)
 */
export function lockScroll() {
  if (typeof document === 'undefined') return () => {}

  const body = document.body
  const root = document.documentElement

  if (lockCount === 0) {
    originalOverflow = body.style.overflow
    originalPaddingRight = body.style.paddingRight

    // Kompensasi hilangnya scrollbar supaya layout tidak "meloncat".
    const scrollbarGap = window.innerWidth - root.clientWidth
    if (scrollbarGap > 0 && !originalPaddingRight) {
      body.style.paddingRight = `${scrollbarGap}px`
    }

    body.style.overflow = 'hidden'
  }

  lockCount += 1

  let released = false
  return function release() {
    if (released) return
    released = true

    lockCount = Math.max(0, lockCount - 1)
    if (lockCount > 0) return

    body.style.overflow = originalOverflow
    body.style.paddingRight = originalPaddingRight
    originalOverflow = ''
    originalPaddingRight = ''
  }
}

/** Jumlah pemegang kunci aktif — dipakai untuk diagnosa/tes. */
export function getScrollLockCount() {
  return lockCount
}

export default lockScroll
