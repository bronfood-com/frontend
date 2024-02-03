import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './SignIn.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputPassword from '../../components/InputPassword/InputPassword';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useEffect } from 'react';

const SignIn = () => {
    const { errorMessage, currentUser, signIn } = useCurrentUser();
    const showError = !!errorMessage;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber } = data;
        signIn({ phone: phoneNumber, password });
    };

    return (
        <Popup title={t('pages.signIn.signInHeading')}>
            <Form name="form-auth" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${showError ? '' : styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>{t(`pages.signIn.${errorMessage}`)}</span>
                </div>
                <FormInputs>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signIn.password')} />
                </FormInputs>
                <Link to="/recovery_pass" className={`${styles.link_recovery} link`}>
                    {t('pages.signIn.forgotPassword')}
                </Link>
                <Button>{t('pages.signIn.loginButton')}</Button>
                <Link to="/signup" className={`${styles.link_registration} link`}>
                    {t('pages.signIn.registartion')}
                </Link>
            </Form>
        </Popup>
    );
};

export default SignIn;
