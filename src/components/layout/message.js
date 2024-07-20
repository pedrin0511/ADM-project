import styles from './message.module.css'
import {useState, useEffect} from 'react'


function Message({type , msg}){

    const [visble, setVisible] = useState(false)

    useEffect(() => {
        if (msg) {
            setVisible(true)

            const timer = setTimeout(() => {
                setVisible(false)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [msg])

    return(
        <>
        {visble&&(
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
        </>
    )
}

export default Message