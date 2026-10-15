import { Injectable, computed, signal } from '@angular/core';

export interface LightboxItem {
  imagen: string;
  titulo: string;
  descripcion?: string;
}

@Injectable({ providedIn: 'root' })
export class LightboxService {
  readonly items = signal<readonly LightboxItem[]>([]);
  readonly indice = signal(0);
  readonly abierto = signal(false);

  readonly actual = computed(() => this.items()[this.indice()] ?? null);
  readonly total = computed(() => this.items().length);

  abrir(items: readonly LightboxItem[], indice = 0): void {
    if (!items.length) return;
    this.items.set(items);
    this.indice.set(Math.min(Math.max(indice, 0), items.length - 1));
    this.abierto.set(true);
  }

  cerrar(): void {
    this.abierto.set(false);
  }

  siguiente(): void {
    const total = this.total();
    if (total < 2) return;
    this.indice.update((i) => (i + 1) % total);
  }

  anterior(): void {
    const total = this.total();
    if (total < 2) return;
    this.indice.update((i) => (i - 1 + total) % total);
  }

  irA(indice: number): void {
    if (indice >= 0 && indice < this.total()) {
      this.indice.set(indice);
    }
  }
}
