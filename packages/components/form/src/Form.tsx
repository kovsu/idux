/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { FORMS_CONTROL_TOKEN, useControl } from '@idux/cdk/forms'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { FORM_TOKEN, formToken } from './token'
import { formProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxForm',
  props: formProps,
  setup(props, { slots }) {
    const control = useControl()
    const { globalHashId, hashId, registerToken } = useThemeToken('form')
    registerToken(getThemeTokens)

    provide(FORMS_CONTROL_TOKEN, control)

    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-form`)
    const config = useGlobalConfig('form')
    const layout = computed(() => props.layout ?? config.layout)
    const size = computed(() => props.size ?? config.size)

    provide(formToken, { props, config })

    provide(FORM_TOKEN, { size })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-${layout.value}`]: true,
        [`${prefixCls}-${size.value}`]: true,
      })
    })

    return () => (
      <form class={classes.value} onSubmit={props.onSubmit}>
        {slots.default && slots.default()}
      </form>
    )
  },
})
