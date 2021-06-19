import create from 'zustand'

const useTabsStore = create(set => ({
    tab1: null,
    tab2: null,
    setTabData: (activeKey, data) => {
        const storeKey = activeKey === '1' ? 'tab1' : 'tab2'
        set({ [storeKey]: data })
    }
}))

export default useTabsStore
