import styles from "./style.module.css";
import Layout from "../../containers/LayoutCustomer";
import Button from "../../../src/Components/Button";
import image from "../../assets/image/supportImage.png";
import * as Accordion from "@radix-ui/react-accordion";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrowDown.svg";
import { ReactComponent as FacebookIcon } from "../../assets/svg/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/svg/instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/svg/linkedin.svg";
import { ReactComponent as YoutubeIcon } from "../../assets/svg/youtube.svg";
import { ReactComponent as MailIcon } from "../../assets/svg/email.svg";
import { ReactComponent as PhoneIcon } from "../../assets/svg/phone.svg";
import { ReactComponent as LocationIcon } from "../../assets/svg/location.svg";
import { ReactNode } from "react";
import { ReactComponent as ArrowBackSvg } from "../../assets/svg/backIcon.svg";
import useMediaQuery from "../../../src/Custom hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const matches = useMediaQuery("(min-width: 800px)");

  const navigate = useNavigate();
  return (
    <Layout>
      <div className={styles.containerFlex}>
        {matches ? (
          <div className={styles.smallMenu}>
            <button>FAQs</button>
            <div className='divider' />
            <button>iFuel Contacts</button>
            <div className='divider' />
            <button>Send a Report</button>
          </div>
        ) : (
          <div className={styles.mobileNav}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              <ArrowBackSvg />
              <span>Back</span>
            </button>
            <h3>Support</h3>
          </div>
        )}

        {/* {!matches && <div className='divider' />} */}

        <Accordion.Root
          type='multiple'
          value={matches ? ["faqs", "contact", "report"] : undefined}
          className={styles.mainPage}
          disabled={matches}>
          <>
            <Accordion.Item value='faqs' className={styles.accordions}>
              {!matches && (
                <Accordion.Trigger className={styles.TriggerHeader}>
                  FAQs
                  <span>
                    <ArrowDown style={{ margin: "auto" }} />
                  </span>
                </Accordion.Trigger>
              )}

              <Accordion.Content>
                <h4>FAQs</h4>
                <Accordion.Root
                  type='single'
                  collapsible
                  className={styles.accordionsContainer}>
                  <AccordionItem
                    value='item-1'
                    triggerQuestion='What is Diesel'>
                    Diesel is know as abcd........xyz
                  </AccordionItem>

                  <AccordionItem
                    value='item-2'
                    triggerQuestion='What is Diesel'>
                    Diesel is know as abcd........xyz
                  </AccordionItem>

                  <AccordionItem
                    value='item-3'
                    triggerQuestion='What is the average rate of diesel?'>
                    Diesel is know as abcd........xyz
                  </AccordionItem>

                  <AccordionItem
                    value='item-4'
                    triggerQuestion='What do I do when the vendor doesn’t show up?'>
                    Diesel is know as abcd........xyz
                  </AccordionItem>

                  <AccordionItem
                    value='item-5'
                    triggerQuestion='What do I do when the vendor doesn’t show up?'>
                    Diesel is know as abcd........xyz
                  </AccordionItem>
                </Accordion.Root>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value='contact' className={styles.contactSection}>
              {!matches && (
                <Accordion.Trigger className={styles.TriggerHeader}>
                  Contact iFuel
                  <span>
                    <ArrowDown style={{ margin: "auto" }} />
                  </span>
                </Accordion.Trigger>
              )}
              <Accordion.Content>
                <h4>Contact iFuel</h4>
                <div className={styles.socialsFlex}>
                  <a href='/facebook.com'>
                    <FacebookIcon />
                  </a>
                  <a href='/twitter.com'>
                    <TwitterIcon />
                  </a>
                  <a href='/linkedin.com'>
                    <LinkedInIcon />
                  </a>
                  <a href='/instagram.com'>
                    <InstagramIcon />
                  </a>
                  <a href='/youtube.com'>
                    <YoutubeIcon />
                  </a>
                </div>
                <div className='divider' />
                <div className={styles.links}>
                  <a href='mailto: feedback@activ8it.ng'>
                    <MailIcon /> <span>ago@ifuel.com</span>
                  </a>
                  <a href='tel: 0803453423'>
                    <PhoneIcon /> <span>080-345-3423</span>
                  </a>
                  <a href='/'>
                    <LocationIcon />{" "}
                    <span>20 Marina, Lagos Island, Lagos.</span>
                  </a>
                </div>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value='report' className={styles.sendReport}>
              {!matches && (
                <Accordion.Trigger className={styles.TriggerHeader}>
                  Send a Report
                  <span>
                    <ArrowDown style={{ margin: "auto" }} />
                  </span>
                </Accordion.Trigger>
              )}
              <Accordion.Content>
                <h4>Send a Report</h4>
                <div className={styles.reportBox}>
                  <div className={styles.inputArea}>
                    <h3>Share your complaints / Reports</h3>
                    <input placeholder='Title' />

                    <textarea placeholder='Report' rows={7} />
                    <Button text='Submit Report' variant='primary' />
                  </div>
                  {matches && (
                    <img alt='vector' src={image} className={styles.image} />
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </>
        </Accordion.Root>
      </div>
    </Layout>
  );
};

interface AccordionItemProps {
  triggerQuestion: string;
  children: ReactNode;
  value: string;
}

const AccordionItem = ({
  triggerQuestion,
  children,
  value,
}: AccordionItemProps) => {
  return (
    <Accordion.Item value={value}>
      <Accordion.Trigger className={styles.accordionTrigger}>
        <div className={styles.flexText}>
          <h3>Question:</h3>
          <p>{triggerQuestion}</p>
        </div>

        <div className={styles.accordionIndicator}>
          <ArrowDown />
          <span>Show</span>
        </div>
      </Accordion.Trigger>

      <Accordion.Content className={styles.AccordionContentText}>
        <p>Answer:</p>
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default SupportPage;
