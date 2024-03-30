import './App.css'

import { Calendar } from './examples/storybook-redux/step-0-mocked/Calendar/index'
import { GlobalCalendarWrapper } from './examples/storybook-redux/step-0-mocked/Calendar/elements'

function App() {
    return (
        <GlobalCalendarWrapper>
            <Calendar />
        </GlobalCalendarWrapper>
    )
}

export default App
