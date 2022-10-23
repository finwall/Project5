import { Link } from 'react-router-dom';

import HodophiliaLogo from '../hodophiliaLogo';
import Search from '../form-search.jsx';
import IndexCSS from './css/index.module.css';

export default function Index() {

    return (
        <div className={IndexCSS.container}>
            <Search />
        </div>
    )
}