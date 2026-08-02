/**
 * Local Storage Management for Tennis Compass
 * 
 * Design Philosophy: 入力ハードルを下げるため、ローカルストレージでシンプルに管理
 * 本番環境ではバックエンドに移行
 */

import { Player, RacketSetup, SetupComparison, RacketSpec, StringSpec } from "./types";
import { nanoid } from "nanoid";

const STORAGE_KEYS = {
  PLAYER: "tennis_compass_player",
  SETUPS: "tennis_compass_setups",
  COMPARISONS: "tennis_compass_comparisons",
  RACKET_SPECS: "tennis_compass_racket_specs",
  STRING_SPECS: "tennis_compass_string_specs",
};

// Initialize default player if not exists
export function initializePlayer(): Player {
  let player = getPlayer();
  if (!player) {
    player = {
      id: nanoid(),
      name: "My Tennis Profile",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(player));
  }
  return player;
}

export function getPlayer(): Player | null {
  const data = localStorage.getItem(STORAGE_KEYS.PLAYER);
  if (!data) return null;
  const player = JSON.parse(data);
  return {
    ...player,
    createdAt: new Date(player.createdAt),
    updatedAt: new Date(player.updatedAt),
  };
}

export function updatePlayer(player: Player): void {
  player.updatedAt = new Date();
  localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(player));
}

// RacketSetup management
export function createRacketSetup(data: Omit<RacketSetup, "id" | "createdAt" | "updatedAt">): RacketSetup {
  const setup: RacketSetup = {
    ...data,
    id: nanoid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const setups = getRacketSetups();
  setups.push(setup);
  localStorage.setItem(STORAGE_KEYS.SETUPS, JSON.stringify(setups));
  return setup;
}

export function getRacketSetups(): RacketSetup[] {
  const data = localStorage.getItem(STORAGE_KEYS.SETUPS);
  if (!data) return [];
  return JSON.parse(data).map((setup: any) => ({
    ...setup,
    createdAt: new Date(setup.createdAt),
    updatedAt: new Date(setup.updatedAt),
  }));
}

export function getRacketSetupById(id: string): RacketSetup | null {
  const setups = getRacketSetups();
  return setups.find((s) => s.id === id) || null;
}

export function updateRacketSetup(id: string, updates: Partial<RacketSetup>): RacketSetup | null {
  const setups = getRacketSetups();
  const index = setups.findIndex((s) => s.id === id);
  if (index === -1) return null;
  
  const updated = {
    ...setups[index],
    ...updates,
    id: setups[index].id,
    createdAt: setups[index].createdAt,
    updatedAt: new Date(),
  };
  setups[index] = updated;
  localStorage.setItem(STORAGE_KEYS.SETUPS, JSON.stringify(setups));
  return updated;
}

export function deleteRacketSetup(id: string): boolean {
  const setups = getRacketSetups();
  const filtered = setups.filter((s) => s.id !== id);
  if (filtered.length === setups.length) return false;
  localStorage.setItem(STORAGE_KEYS.SETUPS, JSON.stringify(filtered));
  return true;
}

// SetupComparison management
export function createSetupComparison(data: Omit<SetupComparison, "id" | "createdAt" | "updatedAt">): SetupComparison {
  const comparison: SetupComparison = {
    ...data,
    id: nanoid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const comparisons = getSetupComparisons();
  comparisons.push(comparison);
  localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify(comparisons));
  return comparison;
}

export function getSetupComparisons(): SetupComparison[] {
  const data = localStorage.getItem(STORAGE_KEYS.COMPARISONS);
  if (!data) return [];
  return JSON.parse(data).map((comp: any) => ({
    ...comp,
    createdAt: new Date(comp.createdAt),
    updatedAt: new Date(comp.updatedAt),
  }));
}

export function getSetupComparisonById(id: string): SetupComparison | null {
  const comparisons = getSetupComparisons();
  return comparisons.find((c) => c.id === id) || null;
}

export function updateSetupComparison(id: string, updates: Partial<SetupComparison>): SetupComparison | null {
  const comparisons = getSetupComparisons();
  const index = comparisons.findIndex((c) => c.id === id);
  if (index === -1) return null;
  
  const updated = {
    ...comparisons[index],
    ...updates,
    id: comparisons[index].id,
    createdAt: comparisons[index].createdAt,
    updatedAt: new Date(),
  };
  comparisons[index] = updated;
  localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify(comparisons));
  return updated;
}

export function deleteSetupComparison(id: string): boolean {
  const comparisons = getSetupComparisons();
  const filtered = comparisons.filter((c) => c.id !== id);
  if (filtered.length === comparisons.length) return false;
  localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify(filtered));
  return true;
}

// Master data (RacketSpec, StringSpec)
export function getRacketSpecs(): RacketSpec[] {
  const data = localStorage.getItem(STORAGE_KEYS.RACKET_SPECS);
  return data ? JSON.parse(data) : getDefaultRacketSpecs();
}

export function getStringSpecs(): StringSpec[] {
  const data = localStorage.getItem(STORAGE_KEYS.STRING_SPECS);
  return data ? JSON.parse(data) : getDefaultStringSpecs();
}

function getDefaultRacketSpecs(): RacketSpec[] {
  const specs = [
    { id: "head-gravity-mp-2023", name: "HEAD Gravity MP 2023", category: "Head" },
    { id: "head-radical-mp-2025", name: "HEAD Radical MP 2025", category: "Head" },
    { id: "babolat-pure-aero-2025", name: "Babolat Pure Aero 2025", category: "Babolat" },
    { id: "yonex-vcore-pro-100", name: "Yonex VCORE Pro 100", category: "Yonex" },
    { id: "wilson-blade-98", name: "Wilson Blade 98", category: "Wilson" },
  ];
  localStorage.setItem(STORAGE_KEYS.RACKET_SPECS, JSON.stringify(specs));
  return specs;
}

function getDefaultStringSpecs(): StringSpec[] {
  const specs = [
    { id: "yonex-hawk-touch", name: "HAWK TOUCH", brand: "Yonex" },
    { id: "babolat-polytour-pro", name: "POLYTOUR PRO", brand: "Babolat" },
    { id: "wilson-rpm-blast", name: "RPM BLAST", brand: "Wilson" },
    { id: "luxilon-alu-power", name: "ALU POWER", brand: "Luxilon" },
    { id: "solinco-tour-bite", name: "Tour Bite", brand: "Solinco" },
  ];
  localStorage.setItem(STORAGE_KEYS.STRING_SPECS, JSON.stringify(specs));
  return specs;
}
