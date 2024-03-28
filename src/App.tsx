import './App.css'

import { Calendar } from './examples/storybook-redux/Calendar/index'
import { GlobalCalendarWrapper } from './examples/storybook-redux/Calendar/elements'

function App() {
    return (
        <GlobalCalendarWrapper>
            <Calendar />
        </GlobalCalendarWrapper>
    )
}

export default App
