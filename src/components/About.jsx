import React from 'react'
import Button from './Button'
import logo from '../assets/logo.svg'
import agplLogo from '../assets/agplv3-with-text-162x68.png'
import { useState } from 'preact/hooks'
import Modal from './Modal'
import { useTranslation } from '../hooks/i18n'

const About = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const { t } = useTranslation()

    return <div className="p-4">

        <div className="mb-8 text-center flex flex-col justify-center items-center space-y-8">

            <img
                className="w-1/2"
                src={logo} alt="Web Darts logo"
            />

            <h1 className="text-5xl">
                {t`about`}
            </h1>

            <p>{t`made-with-heart`}</p>

            <p>
                {t`free-oss`} <a className="text-blue-400" href="#">
                    {t`check-code-link`}
                </a>
            </p>
            
            <h2 className="text-4xl">
                {t`licensing`}
            </h2>


            <div className>
                <p className="mb-2">{t`gnu-agpl`}</p>
                <a href="https://www.gnu.org/licenses/agpl-3.0.html" className="inline-block bg-white rounded-lg p-2 shadow-lg text-center" target="_blank" rel="license noopener noreferrer">
                    <img className="inline-block" src={agplLogo} alt="AGPL v3 logo" />
                </a>
            </div>

            <p xmlnsCc="http://creativecommons.org/ns#" xmlnsDct="http://purl.org/dc/terms/">
                <a className="text-blue-400" property="dct:title" rel="cc:attributionURL" href="https://darts.napkid.dev">
                    {t`web-darts-logo-graphics`}
                </a> {t`by`} <a className="text-blue-400" rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.napkid.dev">
                    Clément Dandrieux
                </a> {t`is-licensed-under`} <a href="http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" className="block text-blue-400">
                        CC BY-SA 4.0
                        <div className="flex items-center justify-center mt-4">

                            <img
                                style={{
                                    height: '22px!important',
                                    marginLeft: '3px',
                                    verticalAlign:'text-bottom'
                                }}
                                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                            />
                            <img 
                                style={{
                                    height: '22px!important',
                                    marginLeft: '3px',
                                    verticalAlign:'text-bottom'
                                }}
                                src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
                            />
                        </div>

                </a>
                <br />© Copyright Clément Dandrieux 2022
            </p>

            <p>
            </p>
        </div>

        {modalOpen && <Modal onExit={() => setModalOpen(false)}>
            <h3 className="text-3xl mb-4">
                {t`for-my-friends`} :
            </h3>
            <ul className="space-y-2 text-xl">
                <li>Jo</li>
                <li>Baba</li>
                <li>Alex</li>
                <li>Clem</li>
                <li>Gaylor</li>
                <li>Axou</li>
                <li>Bouky</li>
                <li>Quentinus</li>
            </ul>
        </Modal>}

        <Button
            color="blue"
            full
            rounded
            size="small"
            onClick={() => setModalOpen(!modalOpen)}
        >
            {t`for-my-friends`}
        </Button>
    </div>
}

export default About