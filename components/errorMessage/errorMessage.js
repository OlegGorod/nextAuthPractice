import Image from 'next/image';
import classes from './errorMessage.module.css'

const ErrorMessage = () => {
    return (
        <div className={classes.container}>
            <Image
                src="/error.gif"
                alt="Error"
                width={200}
                height={200}
                layout='fixed'
            />
        </div>
    )
}

export default ErrorMessage;
