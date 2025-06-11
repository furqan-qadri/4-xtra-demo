// utils.ts
export const formatDate = (dateStr: string | number | Date): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatPrice = (value: number, unit: string = "$"): string => {
  return `${unit}${value}`;
};

export const isPositiveChange = (change: string): boolean => {
  return change.startsWith("+");
};

export const getChangeColor = (change: string): string => {
  return isPositiveChange(change) ? "text-green-600" : "text-red-600";
};

export const getTrendIcon = (change: string) => {
  return isPositiveChange(change) ? "trending-up" : "trending-down";
};
