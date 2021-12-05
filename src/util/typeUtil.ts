/* objectないしarray型から、valueの型を抜き出す */
export type valueof<T> = T[keyof T];
