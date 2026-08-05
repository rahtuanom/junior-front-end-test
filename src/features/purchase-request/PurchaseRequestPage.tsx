import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Product, CartItem as CartItemType, StepType, PaymentMethodId, ToastMessage, OrderHistoryItem } from '@/types';
import { INITIAL_MOCK_PRODUCTS } from './data/mockProducts';
import { PAYMENT_METHODS } from './data/paymentMethods';
import { SHIPPING_METHODS } from './data/shippingMethods';
import { Stepper } from './components/Stepper';
import { ProductCatalog } from './components/ProductCatalog';
import { CartPanel } from './components/CartPanel';
import { PaymentMethod } from './components/PaymentMethod';
import { ShippingMethod } from './components/ShippingMethod';
import { OrderSummary } from './components/OrderSummary';
import { SuccessReceipt } from './components/SuccessReceipt';
import { OrderHistoryView } from './components/OrderHistoryView';
import { Toast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

const STOCKS_STORAGE_KEY = 'ANEMONE_PRODUCT_STOCKS_V2';
const CART_STORAGE_KEY = 'ANEMONE_CART_ITEMS_V2';
const HISTORY_STORAGE_KEY = 'ANEMONE_ORDER_HISTORY_V2';

export interface PurchaseRequestPageProps {
  searchQuery: string;
  isMobileCartOpen?: boolean;
  onCloseMobileCart?: () => void;
  onOpenMobileCart?: () => void;
  resetSignal?: number;
  startSimulationSignal?: number;
  onCartCountChange?: (count: number) => void;
  activeView?: 'katalog' | 'pesanan';
  onGoToKatalog?: () => void;
}

export const PurchaseRequestPage: React.FC<PurchaseRequestPageProps> = ({
  searchQuery,
  isMobileCartOpen: externalIsMobileCartOpen,
  onCloseMobileCart,
  onOpenMobileCart,
  resetSignal,
  startSimulationSignal,
  onCartCountChange,
  activeView = 'katalog',
  onGoToKatalog
}) => {
  // Initialize Products with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedStocks = localStorage.getItem(STOCKS_STORAGE_KEY);
      if (savedStocks) {
        const parsedStocks: Record<string, number> = JSON.parse(savedStocks);
        return INITIAL_MOCK_PRODUCTS.map((p) => ({
          ...p,
          stock: parsedStocks[p.id] !== undefined ? parsedStocks[p.id] : p.stock
        }));
      }
    } catch {
      // Fallback
    }
    return INITIAL_MOCK_PRODUCTS;
  });

  // Initialize Cart with localStorage persistence
  const [cart, setCart] = useState<CartItemType[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart: { productId: string; quantity: number }[] = JSON.parse(savedCart);
        return parsedCart
          .map((item) => {
            const product = INITIAL_MOCK_PRODUCTS.find((p) => p.id === item.productId);
            return product ? { product, quantity: item.quantity } : null;
          })
          .filter((item): item is CartItemType => item !== null);
      }
    } catch {
      // Fallback
    }
    return [
      { product: INITIAL_MOCK_PRODUCTS[0], quantity: 2 },
      { product: INITIAL_MOCK_PRODUCTS[3], quantity: 1 }
    ];
  });

  // Initialize Order History with localStorage persistence
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        return JSON.parse(savedHistory);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>('qris');
  const [selectedShipping, setSelectedShipping] = useState<string>('internal');
  const [internalIsMobileCartOpen, setInternalIsMobileCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const isMobileCartOpen = externalIsMobileCartOpen !== undefined ? externalIsMobileCartOpen : internalIsMobileCartOpen;
  const handleCloseMobileCart = onCloseMobileCart || (() => setInternalIsMobileCartOpen(false));
  const handleOpenMobileCartView = onOpenMobileCart || (() => setInternalIsMobileCartOpen(true));

  // Dynamically update total cart item count to parent Header & BottomNav
  useEffect(() => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (onCartCountChange) {
      onCartCountChange(totalCount);
    }
  }, [cart, onCartCountChange]);

  // Sync products stock to localStorage
  useEffect(() => {
    try {
      const stocksMap: Record<string, number> = {};
      products.forEach((p) => {
        stocksMap[p.id] = p.stock;
      });
      localStorage.setItem(STOCKS_STORAGE_KEY, JSON.stringify(stocksMap));
    } catch {
      // Ignore
    }
  }, [products]);

  // Sync cart items to localStorage
  useEffect(() => {
    try {
      const cartData = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Sync order history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(orderHistory));
    } catch {
      // Ignore
    }
  }, [orderHistory]);

  // Handle Dev Reset Sesi Signal
  useEffect(() => {
    if (resetSignal && resetSignal > 0) {
      localStorage.removeItem(STOCKS_STORAGE_KEY);
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setProducts(INITIAL_MOCK_PRODUCTS);
      setCart([]);
      setOrderHistory([]);
      setCurrentStep(1);
      setIsSuccessModalOpen(false);
    }
  }, [resetSignal]);

  // Handle Start Simulation Signal
  useEffect(() => {
    if (startSimulationSignal && startSimulationSignal > 0) {
      const kotakPensil = products.find((p) => p.id === 'prod-6') || INITIAL_MOCK_PRODUCTS[5];
      setCart([{ product: kotakPensil, quantity: 5 }]);
      setCurrentStep(1);
      showToast('info', 'Simulasi Dimulai: 5 Kotak Pensil Pink telah ditambahkan ke keranjang!');
    }
  }, [startSimulationSignal, products]);

  // Cart Subtotal Calculation
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const selectedShippingObj = SHIPPING_METHODS.find((s) => s.id === selectedShipping) || SHIPPING_METHODS[0];
  const selectedPaymentObj = PAYMENT_METHODS.find((m) => m.id === selectedPayment) || PAYMENT_METHODS[0];
  const shippingCost = selectedShippingObj.price;

  const triggerCalculationDebounce = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 250);
  };

  // Handle Cart Updates
  const handleUpdateCart = (product: Product, quantity: number) => {
    triggerCalculationDebounce();

    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== product.id));
      showToast('info', `Item "${product.name}" dihapus dari keranjang.`);
      return;
    }

    if (quantity > product.stock) {
      showToast('error', 'Produk stok yang dipilih sudah habis!');
      return;
    }

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], quantity };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantityById = (productId: string, quantity: number) => {
    const target = products.find((p) => p.id === productId);
    if (target) {
      handleUpdateCart(target, quantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (target) {
      showToast('info', `"${target.name}" telah dihapus dari keranjang.`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('info', 'Keranjang permintaan telah dikosongkan.');
  };

  const handleExceedStock = (_productName: string, _maxStock: number) => {
    showToast('error', 'Produk stok yang dipilih sudah habis!');
  };

  const showToast = (type: ToastMessage['type'], message: string) => {
    setToast({
      id: Date.now().toString(),
      type,
      message
    });
  };

  // Step Navigation with Loading Animation
  const handleGoToStep1 = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
      setCurrentStep(1);
    }, 300);
  };

  // Next / Submit Action Step Workflow
  const handleNextStep = () => {
    if (cart.length === 0) {
      showToast('error', 'Keranjang Anda masih kosong. Silakan pilih produk terlebih dahulu.');
      return;
    }

    if (currentStep === 1) {
      setIsNavigating(true);
      setTimeout(() => {
        setIsNavigating(false);
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else if (currentStep === 2) {
      // Simulate Submit Process with Loading State
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        // Deduct purchased quantities from product stocks!
        setProducts((prevProducts) =>
          prevProducts.map((p) => {
            const cartItem = cart.find((item) => item.product.id === p.id);
            if (cartItem) {
              const newStock = Math.max(0, p.stock - cartItem.quantity);
              return { ...p, stock: newStock };
            }
            return p;
          })
        );

        const randomRef = 'REQ-ANM-' + Math.floor(100000 + Math.random() * 900000);
        const taxAmt = Math.round(subtotal * 0.11);
        const finalTotal = subtotal + taxAmt + selectedShippingObj.price;

        const newOrder: OrderHistoryItem = {
          id: Date.now().toString(),
          orderNumber: randomRef,
          createdAt: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          cart: [...cart],
          subtotal,
          taxAmount: taxAmt,
          shippingOption: selectedShippingObj,
          paymentMethod: selectedPaymentObj,
          totalAmount: finalTotal,
          status: 'Diproses HO'
        };

        setOrderHistory((prev) => [newOrder, ...prev]);
        setOrderNumber(randomRef);
        setCurrentStep(3);
        setIsSuccessModalOpen(true);
      }, 1500);
    }
  };

  const handleNewOrder = () => {
    setCart([]);
    setCurrentStep(1);
    setIsSuccessModalOpen(false);
    showToast('success', 'Siap membuat permintaan cabang baru!');
  };

  // If user navigated to "Pesanan" tab (Order History View)
  if (activeView === 'pesanan') {
    return (
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FF] h-full overflow-hidden">
        <Toast toast={toast} onClose={() => setToast(null)} />
        <OrderHistoryView
          history={orderHistory}
          onGoToKatalog={onGoToKatalog || handleGoToStep1}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FF] h-full overflow-hidden">
      {/* Toast Notification Top-Center */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* STEP 1: CATALOG & CART (3-COLUMN FLEX LAYOUT) */}
      {currentStep === 1 && (
        <div className="flex-1 flex flex-col lg:flex-row min-w-0 h-full overflow-hidden">
          {/* Center Column: ONLY THIS MAIN AREA SCROLLS */}
          <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 min-w-0 pb-24 lg:pb-8">
            <ProductCatalog
              products={products}
              cart={cart}
              searchQuery={searchQuery}
              onUpdateCart={handleUpdateCart}
              onExceedStock={handleExceedStock}
            />
          </main>

          {/* Right Column: Fixed Cart Panel (Desktop) */}
          <CartPanel
            cart={cart}
            subtotal={subtotal}
            currentStep={currentStep}
            onUpdateQuantity={handleUpdateQuantityById}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNextStep={handleNextStep}
            onExceedStock={handleExceedStock}
            isLoading={isLoading || isNavigating}
          />
        </div>
      )}

      {/* STEP 2: METODE PEMBAYARAN & DETAIL PESANAN */}
      {currentStep === 2 && (
        <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6 animate-in fade-in duration-200 pb-24 lg:pb-8">
          {/* Header & Back Button */}
          <div className="flex items-center justify-between pb-2 border-b border-[#C5C5D3]">
            <div>
              <h1 className="text-xl sm:text-[32px] font-bold text-navy-900">Pembayaran</h1>
              <p className="text-xs sm:text-sm text-[#444651] mt-0.5">Tinjau permintaan, pilih ekspedisi & pembayaran.</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleGoToStep1}
              isLoading={isNavigating}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              className="text-brand-600 border-brand-600 hover:bg-brand-50"
            >
              Kembali ke Keranjang
            </Button>
          </div>

          {/* Stepper Progress */}
          <Stepper currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Left 2 Columns: Detail Pesanan (Unclipped Flexible Container) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-[#C5C5D3] rounded-xl overflow-hidden shadow-xs">
                <div className="bg-navy-50 border-b border-[#C5C5D3] px-4 sm:px-6 py-3.5 flex items-center justify-between">
                  <h2 className="text-base sm:text-[20px] font-semibold text-navy-900">Detail Pesanan</h2>
                  <span className="text-xs font-semibold text-[#757682] bg-white px-2.5 py-0.5 rounded-full border border-[#C5C5D3]">
                    {cart.length} Jenis Item
                  </span>
                </div>
                
                {/* Full Flexible Unclipped List */}
                <div className="p-4 sm:p-6 space-y-4 divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between gap-3 pt-3 first:pt-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-navy-50 rounded-lg p-1.5 border border-[#C5C5D3] shrink-0"
                        />
                        <div>
                          <h4 className="font-semibold text-xs sm:text-base text-navy-900 leading-snug">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-[#757682] mt-0.5">
                            Rp {item.product.price.toLocaleString('id-ID')} &times; {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] sm:text-xs text-[#757682] block">Total Item</span>
                        <span className="font-bold text-xs sm:text-base text-navy-900">
                          Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Method Selection */}
              <div className="bg-white border border-[#C5C5D3] rounded-xl p-4 sm:p-5 shadow-xs">
                <ShippingMethod
                  methods={SHIPPING_METHODS}
                  selectedShipping={selectedShipping}
                  onSelectShipping={(id) => {
                    setSelectedShipping(id);
                    const found = SHIPPING_METHODS.find(s => s.id === id);
                    if (found) showToast('info', `Ekspedisi dipilih: ${found.name}`);
                  }}
                />
              </div>
            </div>

            {/* Right Column: Payment Selection + Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Payment Methods Selection Box */}
              <div className="bg-white border border-[#C5C5D3] rounded-xl p-4 sm:p-5 shadow-xs">
                <PaymentMethod
                  methods={PAYMENT_METHODS}
                  selectedMethod={selectedPayment}
                  onSelectMethod={(id) => {
                    setSelectedPayment(id);
                    const found = PAYMENT_METHODS.find(m => m.id === id);
                    if (found) showToast('info', `Metode pembayaran dipilih: ${found.name}`);
                  }}
                />
              </div>

              {/* Subtotal Cost Breakdown & Submit Button */}
              <OrderSummary
                subtotal={subtotal}
                shippingCost={shippingCost}
                currentStep={currentStep}
                onNextStep={handleNextStep}
                isLoading={isLoading}
                isCalculating={isCalculating}
                disabled={cart.length === 0}
                buttonText="Lanjut ke Konfirmasi"
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE FLOATING CART DRAWER */}
      {isMobileCartOpen && (
        <CartPanel
          cart={cart}
          subtotal={subtotal}
          currentStep={currentStep}
          onUpdateQuantity={handleUpdateQuantityById}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onNextStep={() => {
            handleCloseMobileCart();
            handleNextStep();
          }}
          onExceedStock={handleExceedStock}
          isMobileDrawer={true}
          onCloseMobileDrawer={handleCloseMobileCart}
          isLoading={isLoading}
        />
      )}


      {/* SUCCESS RECEIPT MODAL */}
      <SuccessReceipt
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        cart={cart}
        subtotal={subtotal}
        paymentMethod={selectedPaymentObj}
        shippingOption={selectedShippingObj}
        orderNumber={orderNumber}
        onNewOrder={handleNewOrder}
      />
    </div>
  );
};
