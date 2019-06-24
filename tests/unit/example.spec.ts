import { shallowMount, Wrapper } from "@vue/test-utils"
import HelloWorld from "@/components/helloWorld/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg: string = "new message"
    const wrapper: Wrapper<HelloWorld> = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
