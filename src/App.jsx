import React from 'react'
import { Tabs } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import shallow from 'zustand/shallow'
import useTabsStore from '@oriavner/store/tabs'
import Layout from '@oriavner/hoc/Layout'

const { TabPane } = Tabs

const initialPanes = [
    { title: 'Data A', content: 'Content of Tab 1', key: '1' },
    { title: 'Data B', content: 'Content of Tab 2', key: '2' }
]

function App() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [activeKey, setActiveKey] = React.useState(initialPanes[0].key)

    const [tab1, tab2, setTabData] = useTabsStore(
        ({ tab1, tab2, setTabData }) => [tab1, tab2, setTabData],
        shallow
    )

    const url =
        activeKey === '1'
            ? 'https://jsonplaceholder.typicode.com/users'
            : 'https://jsonplaceholder.typicode.com/todos'

    const onChange = activeKey => setActiveKey(activeKey)

    const onFetchDataHandler = async (opts = {}, shouldReload = true) => {
        shouldReload && setIsLoading(true)
        const res = await fetch(url, opts)
        const data = await res.json()
        setTabData(activeKey, data)
        shouldReload && setIsLoading(false)
    }

    React.useEffect(() => {
        const abortCtrl = new AbortController()
        const opts = { signal: abortCtrl.signal }

        ;(async () => {
            try {
                if (!tab1 || !tab2) {
                    await onFetchDataHandler(opts)
                }
            } catch (err) {
                console.log(err)
            }
        })()

        const interval = setInterval(async () => {
            await onFetchDataHandler(opts, false)
        }, 30000)

        return () => {
            clearInterval(interval)
            abortCtrl.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeKey, url, setTabData])

    return (
        <Layout>
            <div className="container">
                <Tabs onChange={onChange} activeKey={activeKey}>
                    {initialPanes.map(pane => {
                        const currentStoreTab = activeKey === '1' ? tab1 : tab2

                        return (
                            <TabPane
                                tab={
                                    <div>
                                        <span style={{ margin: '0.5rem', cursor: 'pointer' }}>
                                            {pane.title}
                                        </span>
                                        {activeKey === pane.key ? (
                                            <ReloadOutlined onClick={onFetchDataHandler} />
                                        ) : null}
                                    </div>
                                }
                                key={pane.key}
                                closable={false}
                            >
                                {isLoading ? (
                                    <h3>Loading...</h3>
                                ) : (
                                    <>
                                        {React.Children.toArray(
                                            currentStoreTab?.map(item => (
                                                // eslint-disable-next-line react/jsx-key
                                                <div>{item.name || item.title}</div>
                                            ))
                                        )}
                                    </>
                                )}
                            </TabPane>
                        )
                    })}
                </Tabs>
            </div>
        </Layout>
    )
}

export default App
