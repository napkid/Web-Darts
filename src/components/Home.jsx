import { Link } from 'wouter'
import { useTranslation } from "../config/i18n"

const Home = () => {

    const { t } = useTranslation()

    return <div className="h-full flex justify-center items-center">
        <Link to="/players">
            <button className="px-6 py-6 rounded-full bg-emerald-500 border border-emerald-800 hover:bg-emerald-500 shadow text-white font-semibold uppercase text-2xl">
                {t`start-game`}
            </button>
        </Link>
    </div>
}

export default Home