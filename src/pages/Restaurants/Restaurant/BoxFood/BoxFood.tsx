import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonIconOrange/ButtonIconOrange';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';
import { API_URL } from '../../../../utils/consts';
import { useCurrentUser } from '../../../../utils/hooks/useCurrentUser/useCurretUser';
import { useRestaurants } from '../../../../utils/hooks/useRestaurants/useRestaurants';
import { useBasketMutations } from '../../../../utils/hooks/useBasket/useBasket';

function BoxFood({ card, setIsMealPageOpen }: { card: Meal; setIsMealPageOpen: Dispatch<SetStateAction<boolean>> }) {
    const { id, features } = card;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { restaurant } = useRestaurants();
    const { addMeal } = useBasketMutations();
    const hasFeatures = features && features.length > 0;
    const { isLogin } = useCurrentUser();
    const handleClick = () => {
        if (isLogin) {
            if (hasFeatures) {
                navigate(`${pathname}/meal/${id}`);
                setIsMealPageOpen(true);
            } else {
                addMeal.mutateAsync({ restaurantId: restaurant?.id, mealId: id, features: features || [] });
            }
        } else {
            navigate(`/signin`);
        }
    };
    return (
        <div className={`${styles.boxfood}`} onClick={handleClick}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${API_URL}${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price} ₸`}</span>
                    <div className={styles.boxfood__button}>
                        <Button type="button" icon="add" isActive={addMeal.isPending} disabled={addMeal.isPending} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxFood;
