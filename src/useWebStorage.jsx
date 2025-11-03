import { useState, useEffect, useCallback } from "react";
/**
 * React hook for managing browser storage with expiry and cross-tab sync.
 * ✅ localStorage veya sessionStorage
 * ✅ Süre sınırlı veri (expiry)
 * ✅ removeItem / clearAll fonksiyonları
 * ✅ Sekmeler arası senkronizasyon
 * @template T
 * @param {string} key - Storage key.
 * @param {T} initialValue - Default value if not found.
 * @param {"local" | "session"} [type="local"] - Storage type.
 * @param {number | null} [expiryMs=null] - Expiry time in milliseconds.
 * @returns {[T, (value: T) => void, () => void, () => void]} - [value, setValue, removeItem, clearAll]
 */

export function useWebStorage(
  key,
  initialValue,
  type = "local",
  expiryMs = null
) {
  const storage =
    type === "session" ? window.sessionStorage : window.localStorage;

  const [value, setValue] = useState(() => {
    try {
      const item = storage.getItem(key);
      if (!item) return initialValue;

      const parsed = JSON.parse(item);
      if (parsed.expiry && Date.now() > parsed.expiry) {
        storage.removeItem(key);
        return initialValue;
      }

      return parsed.data;
    } catch (error) {
      console.error("useWebStorage read error:", error);
      return initialValue;
    }
  });

  // Storage’a kaydet
  useEffect(() => {
    try {
      const item = {
        data: value,
        expiry: expiryMs ? Date.now() + expiryMs : null,
      };
      storage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error("useWebStorage write error:", error);
    }
  }, [key, value, storage, expiryMs]);

  // 🔹 Sekmeler arası senkronizasyon
  useEffect(() => {
    const syncHandler = (e) => {
      if (e.key === key) {
        if (e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (parsed.expiry && Date.now() > parsed.expiry) {
            storage.removeItem(key);
            setValue(initialValue);
          } else {
            setValue(parsed.data);
          }
        } else {
          setValue(initialValue);
        }
      }
    };

    window.addEventListener("storage", syncHandler);
    return () => window.removeEventListener("storage", syncHandler);
  }, [key, storage, initialValue]);

  // 🔹 Manuel silme
  const removeItem = useCallback(() => {
    storage.removeItem(key);
    setValue(initialValue);
  }, [key, storage, initialValue]);

  // 🔹 Tüm storage’ı temizleme
  const clearAll = useCallback(() => {
    storage.clear();
    setValue(initialValue);
  }, [storage, initialValue]);

  return [value, setValue, removeItem, clearAll];
}
