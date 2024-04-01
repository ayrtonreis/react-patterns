import { Provider } from 'react-redux'

import './App.css'
import { Calendar } from './examples/storybook-redux/step-1-redux/Calendar/index'
import { GlobalCalendarWrapper } from './examples/storybook-redux/step-0-mocked/Calendar/elements'
import { store } from './store/index'

function App() {
    return (
        <Provider store={store}>
            <GlobalCalendarWrapper>
                <Calendar />
            </GlobalCalendarWrapper>
        </Provider>
    )
}

export default App
