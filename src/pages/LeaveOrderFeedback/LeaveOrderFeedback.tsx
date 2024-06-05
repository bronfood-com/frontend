import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './LeaveOrderFeedback.module.scss';
import Popup from '../../components/Popups/Popup/Popup';
import { FC, useEffect, useState } from 'react';
import { useOrderFeedback } from '../../utils/hooks/useOrderFeedback/useOrderFeedback';
import ReviewForm from './ReviewForm/ReviewForm';
import PopupFeedbackThanks from '../PopupFeedbackThanks/PopupFeedbackThanks';

interface LocationState {
    restaurantId: string;
}

const LeaveOrderFeedback: FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [restaurantId, setRestaurantId] = useState<string | null>(null);
    const [showThanksPopup, setShowThanksPopup] = useState(false);

    useEffect(() => {
        const state = location.state as LocationState;
        if (state && state.restaurantId) {
            setRestaurantId(state.restaurantId);
        }
    }, [location.state]);

    const { rating, review, filledStars, isSubmitting, handleRatingChange, handleReviewChange, triggerFilledStars, resetFilledStars, handleSubmitReview } = useOrderFeedback({
        restaurantId: restaurantId!,
        onFeedbackSubmitted: () => setShowThanksPopup(true),
    });

    const handleSkipOrClose = () => {
        if (!isSubmitting) {
            handleSubmitReview();
        }
    };

    if (showThanksPopup) {
        return <PopupFeedbackThanks />;
    }

    return (
        <Popup onClose={handleSkipOrClose}>
            <div className={styles.leave_order_feedback__layout}>
                <h3 className={styles.leave_order_feedback__subtitle}>{t('pages.leaveOrderFeedback.evaluate')}</h3>
                <ReviewForm rating={rating} review={review} onRatingChange={handleRatingChange} onReviewChange={handleReviewChange} filledStars={filledStars} triggerFilledStars={triggerFilledStars} resetFilledStars={resetFilledStars} onSubmit={handleSubmitReview} onSkipOrClose={handleSkipOrClose} isSubmitting={isSubmitting} />
            </div>
        </Popup>
    );
};

export default LeaveOrderFeedback;
