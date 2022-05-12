import { loadStripe } from '@stripe/stripe-js';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebaseConfig';
import { selectUser } from '../../redux/selectors';
import './PlansScreen.css';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);
    console.log('🚀 ~ subscription', subscription);

    useEffect(() => {
        const customerCol = collection(db, 'customers');
        const customersDoc = doc(customerCol, user.uid);
        const subscriptions = collection(customersDoc, 'subscriptions');
        onSnapshot(subscriptions, (snap) => {
            snap.docs.forEach((doc) => {
                const { role, current_period_end, current_period_start } =
                    doc.data();
                setSubscription({
                    role,
                    current_period_end: current_period_end.seconds,
                    current_period_start: current_period_start.seconds,
                });
            });
        });
    }, [user.uid]);

    useEffect(() => {
        const products = collection(db, 'products');
        const q = query(products, where('active', '==', true));
        onSnapshot(q, (snapshot) => {
            const products = {};
            snapshot.docs.forEach(async (product) => {
                products[product.id] = product.data();
                const priceCol = await product.ref;
                const prices = collection(priceCol, 'prices');
                getDocs(prices).then((snapshot) => {
                    snapshot.docs.forEach((price) => {
                        products[product.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        };
                    });
                });
            });
            setProducts(products);
        });
    }, []);

    const loadCheckout = async (priceId) => {
        const collectionRef = collection(db, 'customers');
        const docs = doc(collectionRef, user.uid);

        const checkout = await addDoc(collection(docs, 'checkout_sessions'), {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        onSnapshot(checkout, async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                //Show error to customers and
                //inspect your Cloud Function logs in the Firebase console
                alert(`An error occurred: ${error.message}`);
            }
            if (sessionId) {
                //We have a session, let's redirect to Checkout
                //Init Stripe
                const stripe = await loadStripe(
                    'pk_test_51KyUq6FqR8Uyf2gKkmQnHSi3YUIxhnQCJFaN4oeheMOuAn8KXLngfEnmkWD70kYpCbabUu8GU3wAnI1MvjiqMmwc00tklHkuit'
                );
                if (
                    window.confirm(
                        'You can use test card number to test : 4242-4242-4242-4242. ExpDate: 04/24. CVV: 424 . Nameofcard: ABC'
                    )
                ) {
                    stripe.redirectToCheckout({ sessionId });
                }
            }
        });
    };

    return (
        <div className="planesScreen">
            {subscription && (
                <p>
                    {'Renewal date : ' +
                        new Intl.DateTimeFormat(['ban', 'id']).format(
                            new Date(subscription?.current_period_end * 1000)
                        )}
                </p>
            )}
            {Object.entries(products).map(([productId, productData]) => {
                //add some logic to check if the user's subscription is active...
                const isCurrentPackage = productData.name
                    ?.toLowerCase()
                    .includes(subscription?.role);

                return (
                    <div
                        className={`${
                            isCurrentPackage && 'plansScreen__plan--disabled'
                        } plansScreen__plan`}
                        key={productId}
                    >
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button
                            onClick={() =>
                                !isCurrentPackage &&
                                loadCheckout(productData?.prices?.priceId)
                            }
                        >
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default PlansScreen;
