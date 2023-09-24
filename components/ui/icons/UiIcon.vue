<script lang="ts">
export default defineComponent({
  name: 'UiIcon',
  props: {
    icon: {
      type: String,
      required: true,
    }
  },
  setup (props, { attrs }) {
    // debugger
    const config = useIcons(props.icon)

    const createChildes = (childrens: any[]): VNode[] => childrens.map(({ tag, attrs, childrens }) => h(tag, { ...attrs }, childrens ? createChildes(childrens) : []))

    const childrens = createChildes(config?.childrens || [])
    const commonAttrs = config?.attrs || {}

    return () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      ...props,
      ...attrs,
      ...commonAttrs,
    }, childrens)
  }
})
</script>
