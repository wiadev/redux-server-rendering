export default {
  PENDING: {
    message: {
      messageTitle: 'UH OH',
      messageSubtitle: 'Your missing a lot of info!',
      showTips: true,
    },
    footer: {
      title: 'Your status is PENDING',
      subTitle: 'You must be at least 75% to be published',
      showSubmit: false,
    },
  },
  READY_TO_SUBMIT: {
    message: {
      messageTitle: 'Awesome!',
      messageSubtitle: 'You can now submit for approval.',
      showTips: false,
    },
    footer: {
      title: 'Your status is PENDING',
      showSubmit: true,
    },
  },
};
