"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from "react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  Clock,
  Engine,
  GearSix,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkle,
  Star,
  SteeringWheel,
  Tire,
  Wrench
} from "@phosphor-icons/react";

const nav = ["Преимущества", "Услуги", "Процесс", "Отзывы", "Контакты"];

const phones = [
  { label: "Сервис", value: "+7 (812) 326-47-37", href: "tel:+78123264737" },
  { label: "Запчасти", value: "+7 (812) 326-47-07", href: "tel:+78123264707" }
];

const stats = [
  { value: "4.4", label: "рейтинг" },
  { value: "553", label: "оценки" },
  { value: "254", label: "отзыва" },
  { value: "2010", label: "год запуска" }
];

const benefits = [
  ["Работаем с 2010 года", "Опытная команда и понятный процесс обслуживания."],
  ["Более 550 оценок клиентов", "Социальное доказательство без выдуманных обещаний."],
  ["Полный цикл ремонта", "От диагностики до финальной проверки автомобиля."],
  ["Собственный подбор запчастей", "Помощь с деталями под конкретную задачу."],
  ["Современная диагностика", "Аккуратный поиск причины до начала ремонта."],
  ["Коммерческий транспорт", "Работаем с легковыми и рабочими автомобилями."]
];

const services = [
  "Компьютерная диагностика",
  "Ремонт двигателя",
  "Ремонт ходовой части",
  "Ремонт КПП и АКПП",
  "Автоэлектрика",
  "Развал-схождение",
  "Шиномонтаж",
  "Замена масла",
  "Ремонт кондиционеров",
  "Ремонт тормозной системы",
  "Ремонт рулевых реек",
  "Заправка кондиционеров",
  "Замена ГРМ",
  "Установка дополнительного оборудования",
  "Ремонт выхлопной системы",
  "Запчасти под заказ"
];

const process = [
  "Диагностика",
  "Согласование работ",
  "Подбор запчастей",
  "Выполнение ремонта",
  "Проверка качества",
  "Выдача автомобиля"
];

const brands = [
  "Toyota",
  "Volkswagen",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Mitsubishi",
  "Suzuki",
  "Kia",
  "Hyundai",
  "Ford",
  "Nissan",
  "Opel"
];

const works = [
  { name: "Замена охлаждающей жидкости", price: "от 770 ₽" },
  { name: "Диагностика двигателя", price: "Стоимость уточняйте у менеджера." },
  { name: "Ремонт ходовой части", price: "Стоимость уточняйте у менеджера." },
  { name: "Замена масла", price: "Стоимость уточняйте у менеджера." },
  { name: "Шиномонтаж", price: "Стоимость уточняйте у менеджера." },
  { name: "Ремонт кондиционера", price: "Стоимость уточняйте у менеджера." }
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=85",
    alt: "Автомобиль на подъемнике в сервисной зоне"
  },
  {
    src: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=85",
    alt: "Мастерская с инструментами и оборудованием"
  },
  {
    src: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=85",
    alt: "Диагностика автомобиля в сервисе"
  },
  {
    src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=85",
    alt: "Ремонтная зона автосервиса"
  },
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    alt: "Современный автомобиль клиента"
  },
  {
    src: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=85",
    alt: "Детали и инструменты автосервиса"
  },
  {
    src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=85",
    alt: "Автомобиль после обслуживания"
  },
  {
    src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85",
    alt: "Мойка и подготовка автомобиля"
  }
];

const reveal = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }
};

type MotionExtra = {
  initial?: unknown;
  animate?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
  transition?: { delay?: number; duration?: number; ease?: unknown };
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function revealStyle(
  style: CSSProperties | undefined,
  transition: MotionExtra["transition"]
): CSSProperties | undefined {
  if (!transition?.delay) return style;
  return { ...style, transitionDelay: `${transition.delay}s` };
}

function MotionDiv({
  initial,
  animate,
  whileInView,
  viewport,
  transition,
  className = "",
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & MotionExtra) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`reveal ${className}`} style={revealStyle(style, transition)} {...props} />;
}

function MotionA({
  initial,
  animate,
  whileInView,
  viewport,
  transition,
  className = "",
  style,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & MotionExtra) {
  const ref = useReveal<HTMLAnchorElement>();
  return <a ref={ref} className={`reveal ${className}`} style={revealStyle(style, transition)} {...props} />;
}

function MotionForm({
  initial,
  animate,
  whileInView,
  viewport,
  transition,
  className = "",
  style,
  ...props
}: FormHTMLAttributes<HTMLFormElement> & MotionExtra) {
  const ref = useReveal<HTMLFormElement>();
  return <form ref={ref} className={`reveal ${className}`} style={revealStyle(style, transition)} {...props} />;
}

const motion = {
  div: MotionDiv,
  a: MotionA,
  form: MotionForm
};

function SectionTitle({
  kicker,
  title,
  text
}: {
  kicker?: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div {...reveal} className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      {kicker ? (
        <p className="mb-4 text-sm font-medium text-[#73b3ff]">{kicker}</p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/64 md:text-lg">{text}</p> : null}
    </motion.div>
  );
}

function PrimaryButton({
  children,
  href = "#booking"
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="premium-button inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white active:translate-y-px sm:px-6"
    >
      {children}
    </a>
  );
}

function SecondaryButton({
  children,
  href
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white active:translate-y-px sm:px-6"
    >
      {children}
    </a>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className={`burger-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [navPill, setNavPill] = useState({ left: 0, width: 0, opacity: 0 });

  function moveNavPill(node: HTMLAnchorElement) {
    const parent = navRef.current;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    setNavPill({
      left: nodeRect.left - parentRect.left,
      width: nodeRect.width,
      opacity: 1
    });
  }

  return (
    <main className="page-shell min-h-[100dvh] overflow-hidden text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#03050a]/78 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
            <span className="brand-mark grid size-11 place-items-center rounded-2xl text-lg font-semibold text-white">
              Н
            </span>
            <span>
              <span className="block text-base font-semibold leading-none text-white">Невский</span>
              <span className="mt-1 block text-xs text-white/48">автосервис</span>
            </span>
          </a>

          <nav
            ref={navRef}
            className="liquid-nav relative hidden items-center gap-2 rounded-full p-1 text-sm text-white/68 lg:flex"
            onMouseLeave={() => setNavPill((value) => ({ ...value, opacity: 0 }))}
          >
            <span
              className="liquid-nav-pill"
              style={{
                opacity: navPill.opacity,
                transform: `translateX(${navPill.left}px)`,
                width: navPill.width
              }}
            />
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={(event) => moveNavPill(event.currentTarget)}
                onFocus={(event) => moveNavPill(event.currentTarget)}
                className="liquid-nav-link relative z-10 rounded-full px-4 py-2 transition hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="text-right text-xs leading-5 text-white/56">
              <span className="mb-1 block text-white/72">09:00–21:00 ежедневно</span>
              {phones.map((phone) => (
                <a key={phone.label} href={phone.href} className="block transition hover:text-white">
                  <span className="text-white/38">{phone.label}: </span>
                  {phone.value}
                </a>
              ))}
            </div>
            <PrimaryButton href="tel:+78123264737">
              <Phone size={17} weight="bold" />
              Позвонить
            </PrimaryButton>
          </div>

          <div className="ml-auto mr-2 flex items-center gap-2 lg:hidden">
            <span className="hidden rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs text-white/72 sm:inline-flex">
              09:00–21:00
            </span>
            <a
              href="tel:+78123264737"
              className="premium-button grid size-11 place-items-center rounded-2xl"
              aria-label="Позвонить"
            >
              <Phone size={18} weight="bold" />
            </a>
          </div>

          <button
            className="burger-button grid size-11 place-items-center rounded-2xl lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            <BurgerIcon open={open} />
          </button>
        </div>

        {open ? (
          <div className="mobile-menu border-t border-white/10 bg-[#070b12] px-4 py-5 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                Работаем ежедневно: 09:00–21:00
              </div>
              {nav.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/76"
                >
                  {item}
                </a>
              ))}
              <PrimaryButton href="tel:+78123264737">
                <Phone size={17} weight="bold" />
                Позвонить
              </PrimaryButton>
            </div>
          </div>
        ) : null}
      </header>

      <section className="noise relative min-h-[100dvh] pt-28">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 sm:px-6 md:pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <motion.div {...reveal} className="hero-copy">
            <div className="premium-pill mb-6 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-[#dcecff]">
              <Sparkle size={16} weight="fill" />
              Работаем с 2010 года
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
              Автосервис Невский — ремонт и обслуживание автомобилей в Санкт-Петербурге
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
              Диагностика, ремонт двигателя, ходовой части, КПП, автоэлектрики, кондиционеров и комплексное обслуживание автомобилей любых марок.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton>
                <CalendarCheck size={18} weight="bold" />
                Записаться
              </PrimaryButton>
              <SecondaryButton href="tel:+78123264737">
                <Phone size={18} weight="bold" />
                Позвонить
              </SecondaryButton>
              <SecondaryButton href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20проспект%20Большевиков%2C%2036%20корпус%202">
                <MapPin size={18} weight="bold" />
                Маршрут
              </SecondaryButton>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="metric-card rounded-3xl p-4">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 text-sm text-white/64 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#73b3ff]" />
                проспект Большевиков, 36 корпус 2
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#73b3ff]" />
                Ежедневно с 9:00 до 21:00
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-visual relative"
          >
            <div className="hero-card glass chrome-frame relative overflow-hidden rounded-[28px] p-3">
              <div className="hero-image-stage relative aspect-[4/5] overflow-hidden rounded-[22px] md:aspect-[5/4]">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90"
                  alt="Премиальный автомобиль после обслуживания"
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="hero-car-image object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070b] via-[#05070b]/22 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/12 bg-[#070b12]/78 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/52">Доверие клиентов</p>
                      <p className="mt-1 text-2xl font-semibold">4.4 из 5</p>
                    </div>
                    <div className="flex gap-1 text-[#73b3ff]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} size={18} weight={index < 4 ? "fill" : "regular"} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="преимущества" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Надёжный сервис для ежедневных и премиальных автомобилей" text="Опыт, точная диагностика, подбор запчастей и полный цикл ремонта в одном месте." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([title, text], index) => (
              <motion.div
                key={title}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.035 }}
                className="premium-card card-hover rounded-[24px] p-6"
              >
                <CheckCircle size={28} weight="fill" className="text-[#73b3ff]" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-white/58">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="услуги" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            kicker="Услуги"
            title="Все ключевые работы в одном месте"
            text="Карточки построены как быстрый каталог, чтобы владелец автомобиля сразу видел нужное направление ремонта."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = [Engine, Wrench, SteeringWheel, GearSix, ShieldCheck, Tire][index % 6];
              return (
                <motion.a
                  key={service}
                  href="#booking"
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.02 }}
                  className="premium-card card-hover group min-h-36 rounded-[24px] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon size={26} className="text-[#73b3ff]" />
                    <ArrowRight size={18} className="text-white/28 transition group-hover:translate-x-1 group-hover:text-[#73b3ff]" />
                  </div>
                  <h3 className="mt-8 text-lg font-semibold leading-snug">{service}</h3>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="процесс" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Понятный процесс без лишнего шума" text="От первичной диагностики до выдачи автомобиля после проверки качества." />
          <div className="relative grid gap-4 lg:grid-cols-6">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[#2f8cff] to-transparent lg:block" />
            {process.map((step, index) => (
              <motion.div key={step} {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} className="relative">
                <div className="premium-card rounded-[24px] p-5">
                  <div className="premium-step grid size-14 place-items-center rounded-2xl font-mono text-sm font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-8 text-lg font-semibold">{step}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="premium-panel mx-auto max-w-7xl rounded-[28px] p-6 md:p-10">
          <SectionTitle
            title="Обслуживаем популярные марки автомобилей"
            text="Обслуживаем европейские, японские, корейские, американские, легковые и коммерческие автомобили."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <motion.div
                key={brand}
                {...reveal}
                className="brand-cell grid h-20 place-items-center rounded-[20px] text-center text-sm font-semibold text-white/76"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Популярные работы" text="Стоимость зависит от модели автомобиля, состояния узлов и объёма работ." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <motion.div key={work.name} {...reveal} className="premium-card rounded-[24px] p-6">
                <p className="text-lg font-semibold">{work.name}</p>
                <p className="mt-5 text-2xl font-semibold text-[#73b3ff]">{work.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          {...reveal}
          className="promo-panel mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[28px] p-6 md:grid-cols-[1fr_0.7fr] md:p-10"
        >
          <div>
            <p className="text-sm font-medium text-[#73b3ff]">Акции</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
              Акции при прохождении ТО в СТО Невский
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">
              Уточните актуальные предложения и скидки у менеджеров автосервиса.
            </p>
          </div>
          <div className="flex items-end md:justify-end">
            <PrimaryButton href="#booking">
              Узнать подробнее
              <ArrowRight size={18} weight="bold" />
            </PrimaryButton>
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Рабочая зона и автомобили клиентов" text="Ремонтная зона, диагностическое оборудование, инструменты и подготовка автомобилей после обслуживания." />
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
            {gallery.map((image, index) => (
              <motion.div
                key={image.src}
                {...reveal}
                className={`gallery-tile relative overflow-hidden rounded-[24px] ${
                  index === 0 || index === 4 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070b]/54 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="отзывы" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Отзывы клиентов" text="Рейтинг, оценки и отзывы помогают быстро оценить уровень доверия к сервису." />
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1fr]">
            <motion.div {...reveal} className="premium-panel rounded-[28px] p-8">
              <div className="flex items-center gap-3 text-[#73b3ff]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={22} weight={index < 4 ? "fill" : "regular"} />
                ))}
              </div>
              <div className="mt-8 text-6xl font-semibold">4.4</div>
              <p className="mt-3 text-white/58">553 оценки и 254 отзыва</p>
              <div className="mt-8">
                <SecondaryButton href="#reviews-placeholder">Посмотреть отзывы</SecondaryButton>
              </div>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <motion.div key={item} {...reveal} className="premium-card rounded-[24px] p-6">
                  <div className="h-4 w-32 rounded-full bg-white/12" />
                  <div className="mt-6 h-3 w-full rounded-full bg-white/9" />
                  <div className="mt-3 h-3 w-5/6 rounded-full bg-white/9" />
                  <div className="mt-3 h-3 w-2/3 rounded-full bg-white/9" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr]">
          <motion.div {...reveal}>
            <p className="text-sm font-medium text-[#73b3ff]">Запись</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Оставьте заявку на обслуживание</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/64">
              Оставьте контакты, марку автомобиля и задачу. Менеджер свяжется с вами для уточнения времени визита.
            </p>
            <div className="mt-8 space-y-4 text-white/68">
              {phones.map((phone) => (
                <a key={phone.label} href={phone.href} className="flex items-center gap-3 transition hover:text-white">
                  <Phone size={20} className="text-[#73b3ff]" />
                  {phone.value} ({phone.label})
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            {...reveal}
            onSubmit={(event) => event.preventDefault()}
            className="premium-panel rounded-[28px] p-5 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {["Имя", "Телефон", "Марка автомобиля"].map((label) => (
                <label key={label} className="grid gap-2 text-sm text-white/72">
                  {label}
                  <input
                    className="premium-input min-h-13 rounded-2xl px-4 text-white outline-none transition placeholder:text-white/32"
                    placeholder={label}
                  />
                </label>
              ))}
              <label className="grid gap-2 text-sm text-white/72 md:col-span-2">
                Что требуется сделать
                <textarea
                  className="premium-input min-h-32 resize-none rounded-2xl px-4 py-4 text-white outline-none transition placeholder:text-white/32"
                  placeholder="Кратко опишите задачу"
                />
              </label>
            </div>
            <button className="premium-button mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold text-white active:translate-y-px">
              <CalendarCheck size={18} weight="bold" />
              Записаться в сервис
            </button>
          </motion.form>
        </div>
      </section>

      <section id="контакты" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1fr]">
          <motion.div {...reveal} className="premium-panel rounded-[28px] p-6 md:p-8">
            <h2 className="text-3xl font-semibold md:text-5xl">Контакты</h2>
            <div className="mt-8 space-y-5 text-white/68">
              <p className="flex gap-3">
                <MapPin size={22} className="mt-1 shrink-0 text-[#73b3ff]" />
                Санкт-Петербург, проспект Большевиков, 36 корпус 2
              </p>
              <p className="flex gap-3">
                <Clock size={22} className="mt-1 shrink-0 text-[#73b3ff]" />
                09:00–21:00
              </p>
              {phones.map((phone) => (
                <a key={phone.label} href={phone.href} className="flex gap-3 transition hover:text-white">
                  <Phone size={22} className="shrink-0 text-[#73b3ff]" />
                  {phone.value} ({phone.label})
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="tel:+78123264737">
                <Phone size={18} weight="bold" />
                Позвонить
              </PrimaryButton>
              <SecondaryButton href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20проспект%20Большевиков%2C%2036%20корпус%202">
                <MapPin size={18} weight="bold" />
                Построить маршрут
              </SecondaryButton>
            </div>
          </motion.div>

          <motion.div {...reveal} className="map-grid relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/10">
            <div className="premium-pin absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full">
              <MapPin size={30} weight="fill" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/12 bg-[#05070b]/82 p-5 backdrop-blur-xl">
              <p className="text-sm text-white/52">Автосервис «Невский» на карте</p>
              <p className="mt-1 text-lg font-semibold">проспект Большевиков, 36 корпус 2</p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="brand-mark grid size-11 place-items-center rounded-2xl text-lg font-semibold text-white">
                Н
              </span>
              <div>
                <p className="font-semibold">Автосервис «Невский»</p>
                <p className="mt-1 text-sm text-white/46">Ремонт и обслуживание автомобилей</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/46">
              Сведения на сайте носят справочный характер. Актуальные цены, сроки и условия обслуживания уточняйте у менеджеров.
            </p>
          </div>
          <div className="text-sm text-white/58">
            <p className="mb-3 font-semibold text-white">Навигация</p>
            <div className="grid gap-2">
              {nav.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="text-sm text-white/58">
            <p className="mb-3 font-semibold text-white">Контакты</p>
            <p>Санкт-Петербург, проспект Большевиков, 36 корпус 2</p>
            <p className="mt-2">09:00–21:00</p>
            <p className="mt-2">+7 (812) 326-47-37</p>
            <p className="mt-2">+7 (812) 326-47-07</p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl text-sm text-white/36">© 2026 Автосервис «Невский»</div>
      </footer>

      <a
        href="tel:+78123264737"
        className="premium-button fixed bottom-4 left-4 right-4 z-50 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white lg:hidden"
      >
        <Phone size={19} weight="bold" />
        Позвонить в сервис
      </a>
    </main>
  );
}
