import Lookup from '@/data/Lookup';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { UserDetailContext } from '@/context/user.detail.context';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const PricingModel = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedOPtion, setSelectedOption] = useState();
  const updateToken = useMutation(api.users.UpdateToken);
  const onPaymentSuccess = async () => {
    const token = Number(userDetail?.token) + Number(selectedOPtion.value);
    comsole.log(token);
    await updateToken({
      token: token,
      userId: userDetail?._id,
    });
  };
  return (
    <div className="m-10 max-h-[600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div className="border rounded-xl p-4 flex flex-col gap-3" key={index}>
          <h2 className="font-bold text-2xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens}</h2>
          <p className="text-gray-400">{pricing.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            ${pricing.price}
          </h2>
          {/* <Button className="mb-3 mt-3">Upgrade to {pricing.name}</Button> */}
          <div className="relative z-10">
            <PayPalButtons
              onClick={() => {
                setSelectedOption(pricing.value);
                console.log(pricing.value);
              }}
              disabled={!userDetail}
              style={{
                layout: 'horizontal',
                color: 'blue',
                shape: 'rect',
                label: 'pay',
                height: 35,
              }}
              onApprove={() => onPaymentSuccess()}
              onCancel={() => console.log('Payment Canceled')}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: pricing.price,
                        currency_code: 'USD',
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
