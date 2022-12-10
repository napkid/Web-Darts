// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { Link } from 'wouter'
import useTranslation from '\.\./\.\./hooks/i18n'

import logo from '../../assets/logo.svg'
import Button from '../common/Button'

const Home = () => {

    const { t } = useTranslation()

    return <div className="h-full space-y-8 flex flex-col justify-center items-center">


        <img
            className="w-1/2"
            src={logo} alt="Web Darts logo"
        />
        

        <Link to="/players">
            <Button pill size="big" color="green">
                {t`start-game`}
            </Button>
        </Link>
        <Link to="/about">
            <Button pill size="big" color="gray">
                {t`about`}
            </Button>
        </Link>
    </div>
}

export default Home