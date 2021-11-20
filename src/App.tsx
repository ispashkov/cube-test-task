import * as React from 'react';
import { Checkbox } from "./components/checkbox/checkbox.component";

export const App: React.FC = () => {
    const [checked] = React.useState<boolean>(false)

    const onChangeHandlerControlled = (value: boolean) => {
        console.log('Controlled: ', value)
    }

    const onChangeHandlerUncontrolled = (value: boolean) => {
        console.log('Uncontrolled: ', value);
    }

    return (
        <div className="App">
            <h2>Uncontrolled</h2>
            <Checkbox defaultValue={true} onChange={onChangeHandlerUncontrolled} />

            <h2>Controlled</h2>
            <Checkbox value={checked} onChange={onChangeHandlerControlled} />
        </div>
    );
}
