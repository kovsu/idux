/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵOverlayProps } from '@idux/components/_private/overlay'

import { type ComputedRef, computed } from 'vue'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

const defaultOffset: [number, number] = [0, 8]
export function useOverlayProps(context: TimePickerContext | TimeRangePickerContext): ComputedRef<ɵOverlayProps> {
  return computed(() => {
    const { props, config, accessor, mergedPrefixCls, overlayOpened, setOverlayOpened } = context
    return {
      clickOutside: true,
      disabled: accessor.disabled.value || props.readonly,
      offset: defaultOffset,
      placement: 'bottomStart',
      transitionName: 'ix-fade',
      target: props.overlayContainer ?? config.overlayContainer ?? `${mergedPrefixCls.value}-overlay-container`,
      trigger: 'manual',
      visible: overlayOpened.value,
      'onUpdate:visible': setOverlayOpened,
    }
  })
}