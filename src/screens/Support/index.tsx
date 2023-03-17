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

const SupportPage = () => {
  return (
    <Layout>
      <div className={styles.containerFlex}>
        <div className={styles.smallMenu}>
          <button>FAQs</button>
          <div className='divider' />
          <button>iFuel Contacts</button>
          <div className='divider' />
          <button>Send a Report</button>
        </div>

        <div className={styles.mainPage}>
          <div className={styles.accordions}>
            <h3>FAQs</h3>

            <Accordion.Root
              type='single'
              defaultValue='item-1'
              collapsible
              className={styles.accordionsContainer}>
              <AccordionItem value='item-1' triggerQuestion='What is Diesel'>
                Diesel is know as abcd........xyz
              </AccordionItem>

              <AccordionItem value='item-2' triggerQuestion='What is Diesel'>
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
          </div>

          <div className={styles.contactSection}>
            <h3>Contact iFuel</h3>
            <div className={styles.socialsFlex}>
              <FacebookIcon />
              <TwitterIcon />
              <LinkedInIcon />
              <InstagramIcon />
              <YoutubeIcon />
            </div>
            <div className='divider' />
            <div className={styles.links}>
              <a href='mailto: feedback@activ8it.ng'>
                <MailIcon /> <span>ago@ifuel.com</span>
              </a>
              <a href='tel: 0803453423'>
                <PhoneIcon /> <span>080-345-3423</span>
              </a>
              <a href=''>
                <LocationIcon /> <span>20 Marina, Lagos Island, Lagos.</span>
              </a>
            </div>
          </div>

          <div className={styles.sendReport}>
            <h3>Send a Report</h3>
            <div className={styles.reportBox}>
              <div className={styles.inputArea}>
                <h3>Share your complaints / Reports</h3>
                <input placeholder='Title' />

                <textarea placeholder='Report' rows={7} />
                <Button text='Submit Report' variant='primary' />
              </div>
              <img alt='vector' src={image} className={styles.image} />
            </div>
          </div>
        </div>
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