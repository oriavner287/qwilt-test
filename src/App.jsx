import React from 'react'
import { Tabs } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import shallow from 'zustand/shallow'
import useTabsStore from '@oriavner/store/tabs'
import fetchDataAPI from '@oriavner/utils/fetchDataAPI'
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

    const onFetchDataHandler = React.useCallback(
        async shouldReload => {
            if (shouldReload || !tab1 || !tab2) {
                setIsLoading(true)

                const data = await fetchDataAPI(url)
                setTabData(activeKey, data)

                setIsLoading(false)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [activeKey, setTabData, url]
    )

    React.useEffect(() => {
        onFetchDataHandler(false)
    }, [onFetchDataHandler])

    React.useEffect(() => {
        const interval = setInterval(async () => {
            const data = await fetchDataAPI(url)
            setTabData(activeKey, data)
        }, 30000)

        return () => clearInterval(interval)
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
                                            <ReloadOutlined
                                                onClick={() => onFetchDataHandler(true)}
                                            />
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
