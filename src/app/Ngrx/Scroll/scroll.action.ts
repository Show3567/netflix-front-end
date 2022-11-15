import { createAction, props } from '@ngrx/store';

export const RecordScrollPosition = createAction(
  '[ ScrollPosition ] Record Scroll Position',
  props<{ name: string; x: number; y: number }>()
);
