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