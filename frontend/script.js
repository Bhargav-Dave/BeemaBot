var $messages = $(".messages-content"),
  d,
  h,
  m,
  i = 0;

$(window).load(function () {
  $messages.mCustomScrollbar();
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}

function setDate() {
  d = new Date();
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ":" + m + "</div>").appendTo(
      $(".message:last")
    );
  }
}

function insertMessage() {
  msg = $(".message-input").val();
  if ($.trim(msg) == "") {
    return false;
  }
  $('<div class="message message-personal">' + msg + "</div>")
    .appendTo($(".mCSB_container"))
    .addClass("new");
  setDate();
  $(".message-input").val(null);
  updateScrollbar();
  setTimeout(function () {
    fakeMessage(msg);
  }, 1000 + Math.random() * 20 * 100);
}

$(".message-submit").click(function () {
  insertMessage();
});

$(window).on("keydown", function (e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});

const Reponses = {
  INFO_ADD_HOUSE: "Here are the few steps to add your house to insurance",
  INFO_ADD_REMOVE_INSURED: "Sure, We'll help you to remove insurace policy",
  INFO_ADD_REMOVE_VEHICLE:
    "Follow below steps to add/remove vehicle from policy",
  INFO_ADD_VEHICLE_PROPERTY_PAPERLESS_BILLING:
    "Follow below steps to add vehicle and property to paperless billing",
  INFO_AGENT_WRONG:
    "Okay, Let us verify your agent information and I'll be back to you",
  INFO_AGT_NOT_RESPONDING: "Then Change the agent, you noob",
  INFO_AMERICAN_STAR: "Nothing, its just fancy american word",
  INFO_AMT_DUE: "Here is the website on which you can check amount due",
  INFO_AST_PURCHASE:
    "Here is the website on which you can purchase insurance policy",
  INFO_AST_QUOTE: "Here is possible few answers about your Auto Quotation",
  INFO_ATV_INS_EXPLAN: "Few Details of ATV insurance plan",
  INFO_AUTO_COV_QUESTION: "Few Possible answers about Auto insurance policy",
  INFO_AUTO_INS_CANADA:
    "Go Canada Go, Candian auto insurance policy details are here",
  INFO_AUTO_POLICY_CANT_SEE_IN_ACCT:
    "You can't see your policy in your account, but you can see it in your policy history",
  INFO_AUTO_PYMT_CANCEL:
    "You can cancel your auto payment by following few steps",
  INFO_AUTO_PYMT_MIN_BALANCE: "Details about minimum auto pay balance",
  INFO_AUTO_PYMT_SCHEDULE: "Details about auto payment schedule",
  INFO_BILL_DUE_DATE:
    "Here is the website on which you can check bill due date",
  INFO_BILLING_ACCT_NAME_EDIT:
    "Talk to your agent, not to me to setup billing account",
  INFO_BILLING_ACCT_NUM:
    "I dont know your billing acc number, talk to motabhai",
  INFO_BILLING_DEPT_CONTACT:
    "Here is the contact information for billing department",
  INFO_BOAT_COV_EXPLAN: "Dont do boat insurance, get new jet instead",
  INFO_BUSINESS_POLICY_CANT_SEE:
    "You can't see your policy in your account, but you can see it in your policy history",
  INFO_CANCEL_CONFIRM:
    "Your policy cancellation will reflect in your billing account in few days",
  INFO_CANCEL_FEE:
    "Here is the website on which you can check cancellation fee",
  INFO_CANCEL_INS_POLICY:
    "Here are few steps by which you can cancel your insurance policy",
  INFO_CANT_SEE_FARM_RANCH_POLICY: "Details about farm insurance policy",
  INFO_CANT_SEE_POLICY:
    "You can't see your policy in your account, but you can see it in your policy history",
  INFO_CAREERS: "Go to banglore to find jobs",
  INFO_CFR_QUESTION_GENERAL: "Commercial policy information is here",
  INFO_CHANGE_AGENT: "Ok Bro, we'll try to change your agent",
  INFO_CHANGE_AUTOPAY_DATE: "Few steps to change autopay dates",
  INFO_CHANGE_BANK_ACCT: "Few steps to update bank details",
  INFO_CHANGE_USERID: "Talk to your agent, not to me to change your userid",
  INFO_CL_ADJUSTER_INFO: "Here is the contact information for adjuster",
  INFO_CL_CHECK_STATUS:
    "Here is the website on which you can check claim status",
  INFO_CL_CLAIM_FILED:
    "Here is the website on which you can see the status of filed claim",
  INFO_CL_COMPLAINT:
    "Here is the website on which you can file a complaint about your claim",
  INFO_CL_DOCS_EMAIL: "Here is the contact info to send claim documents",
  INFO_CL_DOCS_FAX: "Here is the contact FOR FAX",
  INFO_CL_DOCS_MAIL: "Here is the contact FOR MAIL",
  INFO_CL_DOCS_SEND: "Here is the contact for sending claim documents",
  INFO_CL_DRP_JOIN:
    "Information about Direct Repair Joining, blah blah blah blah !",
  INFO_CL_FILE_CLAIM: "Here is the website on which you can file a claim",
  INFO_CL_FNOL: "Details about filing claim",
  INFO_CL_FNOL_AUTO_HAIL: "Hail Claim Details",
  INFO_CL_GLASS_SAFELITE: "Safelite Contact Details is here",
  INFO_CL_RENTAL: "Details about rental services in your area",
  INFO_CL_SHOP_ADD_WORK: "Details for additional aprooval from auth",
  INFO_CL_SHOP_SEND_ESTIMATE: "Details for estimated claim for shop",
  INFO_CL_STATUS: "Here is the website on which you can check claim status",
  INFO_CL_UPDATE_INFO: "Update claim info here",
  INFO_COLL_COV_EXPLAN: "Details about collision coverage insurance",
  INFO_COLLECTIONS: "Here is the few possible answers about collections",
  INFO_COMBINE_PYMTS: "Few steps to setup combined payment",
  INFO_COMP_COV_EXPLAN: "Details about comprehensive coverage insurance",
  INFO_CONFIRM_COVERAGE: "Your coverage status is in your billing acc",
  INFO_CREDIT_CARD_CHANGE_NUM:
    "Talk to your agent, not to me to change your credit card number",
  INFO_CREDIT_CARD_FEE:
    "Ask to CRED about credit card fees, they tracks each hidden charges",
  INFO_CUSTOMER_SERVICE_HOURS: "Details of Working hours",
  INFO_DEC_PAGE_NEEDED: "You can access declaration page from your account",
  INFO_DED_EXPLAN: "Details about purpose of deductible",
  INFO_DEDUCTIBLE: "Policy Details about deductible",
  INFO_DELETE_DUPE_PYMT: "Policies about getting dubplicated payment back",
  INFO_DIFFERENT_AMTS: "Details about difference amounts",
  INFO_DISCOUNTS: "Ask to the agenet about Discount offers",
  INFO_DO_NOT_CONTACT:
    "Sure, you will not be contacted after closing procedure completed",
  INFO_DREAMKEEP_REWARDS: "Details about DreamKeep Rewards",
  INFO_DREAMKEEP_REWARDS_ERRORS:
    "Here are the possibilities for the errors by accessign dreamkeep rewards",
  INFO_DREAMS_FOUNDATION: "Details about Dreams Foundation",
  INFO_EMPLOYMENT_VERIFY: "Few Steps to do employment verifications",
  INFO_ERS: "Policies about emergency roadside assistance plan",
  INFO_ERS_CONTACT:
    "Contact information for emergency roadside assistance agent",
  INFO_FIND_AGENT: "Find yourself, I dont help to find agenets",
  INFO_FLOOD_INS_EXPLAN: "Details about flood insurance",
  INFO_FORGOT_EMAIL: "Reset whole account by contacting agenet",
  INFO_FORGOT_PASSWORD: "Use OTP Auth to reset password",
  INFO_FORGOT_USERID: "Use email Auth to get info for your userid",
  INFO_GAP_COVERAGE: "Details about gap coverage",
  INFO_GEN_POLICY_COV_QUESTION:
    "Few Possible answers about general policy coverage questions",
  INFO_GET_A_QUOTE_AUTO: "Few steps to get a quote for auto insurance",
  INFO_GET_A_QUOTE_AUTO_NONOWNER:
    "Few steps to get a quote for nonowner auto insurance",
  INFO_GET_A_QUOTE_CFR:
    "Few steps to get a quote for commercial/business insurance",
  INFO_GET_A_QUOTE_OTHER: "All types of quotes, find on website",
  INFO_GET_A_QUOTE_RENTERS: "Few steps to get a quote for renters insurance",
  INFO_GET_A_QUOTE_RENTERS_PURCHASE: "Details of How to get renters insurance",
  INFO_GLASS_COV: "Details about glass coverage",
  INFO_HANDLING_FEE_REMOVE: "Few Steps need to follow to remove handling fee",
  INFO_HEALTH_INS_QUOTE: "Few steps to get a quote for health insurance",
  INFO_HOMESITE_CONTACT: "Details about homesite policy",
  INFO_INS_CARD_PROOF: "Details about insurance card proof",
  INFO_INS_CARD_PRINT: "Here is the PDF file to be printed",
  INFO_INS_CARD_SEND: "Okay, I'll send card details soon",
  INFO_INS_NOT_AVAILABLE: "Business availability Details",
  INFO_KNOWYOURDRIVE: "Details about KnowYourDrive",
  INFO_KNOWYOURDRIVE_DEVICE_ACTIVATE:
    "follw these few steps to KnowYourDrive device activation",
  INFO_KNOWYOURDRIVE_DEVICE_RETURN: "Details about device return",
  INFO_KNOWYOURDRIVE_ERRORS:
    "Here are the possibilities for the errors by accessign KnowYourDrive",
  INFO_LETTER_OF_EXPERIENCE: "Details about how to get letter of experience",
  INFO_LIAB_EXPLAN: "Details about liability coverage",
  INFO_LIFE_BENEFICIARY_CHANGE: "Details about life beneficiary change",
  INFO_LIFE_CASH_OUT:
    "Okay, Follow few steps to get cash out from yout life insurance policy",
  INFO_LIFE_INCR_COV: "Details about life insurance coverage increase",
  INFO_LIFE_POLICY_AMT_DUE:
    "Check due amount of life insurance policy via link below",
  INFO_LIFE_POLICY_AUTO_PYMT:
    "Details about life insurance policy auto payment, and talk to your agent",
  INFO_LIFE_POLICY_CANCEL:
    "Do not cancel life insurance vro, still you can know the process via link below",
  INFO_LIFE_POLICY_CANNOT_SEE:
    "You can view life insurance policy detail in your billing account",
  INFO_LIFE_QUESTION_GENERAL:
    "Few possible answers about life insurance questions",
  INFO_LIFE_REFUND: "Details about how to get life insurance refund",
  INFO_LIFE_UPDATE_CONTACT_INFO:
    "follow few steps given to update contact info in life insurance policy",
  INFO_LOG_OUT: "Go to corner button click and boom there is logout option",
  INFO_LOGIN_ERROR:
    "Verify by email to get your creds back, if there is login err",
  INFO_MAIL_PYMT_ADDRESS: "Details about mailing payment address",
  INFO_MAKE_PYMT:
    "You can pay using UPI, STRIPE, or RTGS, NEFT, so easy, details in your account",
  INFO_MEXICO_AUTO_INS: "Yess, Auto Insurance business availibile in Maxico",
  INFO_MORTGAGE_CO_POI: "All the Details about mortgage co poi",
  INFO_NAME_CHANGE: "Change name from yout account profile",
  INFO_NEW_VEHICLE_GRACE_PERIOD: "Details about new vehicle grace period",
  INFO_ONE_TIME_PYMT:
    " You can get one time payment link via email, if your email is verified",
  INFO_OPERATING_AREA: "Availibility across world",
  INFO_OPERATING_CO: "Here are the all companies we operate",
  INFO_PAPERLESS_DOCS_SETUP: "Few steps to follow to setup paperless docs",
  INFO_PAPERLESS_DOCS_STOP: "Few steps to follow to stop paperless docs",
  INFO_PAPERLESS_MAIL:
    "You will recieve all the statements monthy on your email",
  INFO_PAY_LIFE_INS: "Few steps to pay life insurance policy",
  INFO_PHONE_NUM: "Here is the list for local curtomer care phone numbers",
  INFO_PHONE_NUM_INTERNATIONAL:
    "Here is the list for international curtomer care phone numbers",
  INFO_POI_OLD: "You can get old Proof of insurance in your account history",
  INFO_POLICY_DOC_NEEDED: "You'll Get copy of docs soon on email",
  INFO_POLICY_NUM:
    " Check your account to get details about your activated policies",
  INFO_POLICY_TRANS_TO_RENTAL:
    "Check details about auto rental services on our website",
  INFO_PREMIUM_BREAKDOWN:
    "Check our website to get full breackdown structures of all insurance policies premium",
  INFO_PREPAID_CARD_PYMT: "Few steps to follow to pay via prepaid card",
  INFO_PYMT_CONFIRM: "Check Payment process status on your account",
  INFO_PYMT_DUEDATE_CHANGE: "Talk to your agenet to Change payment due date",
  INFO_PYMT_ERROR: "Few possible solutions for error in payments",
  INFO_PYMT_HISTORY: "Check your payment history on your billing account",
  INFO_PYMT_NOT_ONTIME:
    "No worries, only 1% charge is applied on late payments, do it now",
  INFO_PYMT_PROCESS_CHANGE: "Talk to your agent to change payment process",
  INFO_PYMT_SETUP_AUTO_PYMT: "Few steps to follow to setup auto payment",
  INFO_PYMT_TIME:
    "It takes t+1 day time to process your payment, will reflect in your account soon",
  INFO_REFUND_CHECK:
    "visit your account notifications to get updates about refund check",
  INFO_REINSTATE_INS_POLICY:
    "Talk to our customer cares to reinstate insurance policy",
  INFO_RENTERS_COV_EXPLAN: "Details about renters insurance coverage",
  INFO_RIDESHARE_COV: "Details about rideshare coverage",
  INFO_RV_INS_EXPLAN: "Informations about RV insurance coverage",
  INFO_SALVAGE_VEHICLE: "Policy details for any salvage vehicle",
  INFO_SET_UP_ACCT:
    "Follow few steps to set up your account, and talk to agent",
  INFO_SPEAK_TO_REP: "Humans sucks, strill Here are contacts for represtatives",
  INFO_srtwentytwo: "Here are the details about srtwentytwo",
  INFO_TEEN_SAFE_DRIVER_SIGNUP: "All the info about teen safe driver program",
  INFO_THE_GENERAL_CONTACT: "Here are the general contacts",
  INFO_TRANSFER_ACCT_BALANCE:
    "Transfer your account balance to another account, by following steps",
  INFO_TRAVEL_INS_EXPLAN: "Details about travel insurance coverage",
  INFO_UPDATE_CONTACT_INFO:
    "Follow few steps to update contact info in policy account",
  INFO_UPDATE_EMAIL: "Follow few steps to update email in policy account",
  INFO_UPDATE_LIENHOLDER:
    "Follow few steps to update lienholder in policy account",
  INFO_UPDATE_PHONE_NUM:
    "Follow few steps to update phone number in policy account",
  INFO_UW_ALUMNI_DISCOUNT:
    "Here are the eligibilty details about UW alumni discount",
  INFO_WHO_IS_MY_AGENT: "Check your account to get contact info of your agent",
  INFO_WHY_WAS_POLICY_CANCELLED: "Few possbile reasons why policy is cancelled",
  NO: "Be positive",
  ST_GENERAL_REQUEST: "Yes Sure !",
  ST_HELLO: "Hey, How you doin !",
  ST_HOW_IS_ABBY: "Doin my job, answering your all the questions",
  ST_HOW_OLD_IS_ABBY: "Not your concern to get my age",
  ST_IS_ABBY_REAL: "Yes, I am robot technically",
  ST_THANK_YOU: "You welcome !",
  ST_WHAT_CAN_ABBY_DO: "I can do many things, like answering your questions",
  ST_WHERE_DOES_ABBY_LIVE: "I live in cloud servers, but I can do many things",
  YES: "Okay, thanks for agreeing",
  INFO_CL_HRP_JOIN: "Here are the details about CL HRP join",
  INFO_ERS_REIMBURSE: "Follow few steps to get ERS reimbursed",
  INFO_PROFILE_SECTION:
    "Right sidebar second last option is profie button, click it and boom !",
};

function fakeMessage(query) {
  if ($(".message-input").val() != "") {
    return false;
  }
  $(
    '<div class="message loading new"><figure class="avatar"><img src="./modiji.jpg" /></figure><span></span></div>'
  ).appendTo($(".mCSB_container"));
  updateScrollbar();

  axios
    .post("http://e647-123-201-24-50.ngrok.io/chatbot/classify", {
      sentence: query,
    })
    .then(function ({ data }) {
      $(".message.loading").remove();
      $(
        '<div class="message new"><figure class="avatar"><img src="./modiji.jpg" /></figure>' +
          Reponses?.[data[0].tag] || data[0].tag + "</div>"
      )
        .appendTo($(".mCSB_container"))
        .addClass("new");
      setDate();
      updateScrollbar();
    });
}
