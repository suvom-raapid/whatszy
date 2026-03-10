/**
 * WhatsApp Chat Mockup Generator
 * Creates realistic WhatsApp conversation mockups
 */
(function() {
  'use strict';

  var messages = [];
  var currentSender = 'sent';
  var chatTheme = 'light';

  function getEl(id) {
    return document.getElementById(id);
  }

  function getContactName() {
    return getEl('mockupContactName').value || 'Contact';
  }

  function getContactStatus() {
    return getEl('mockupContactStatus').value || 'online';
  }

  function getCurrentTime() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
  }

  function setSender(type) {
    currentSender = type;
    var btns = document.querySelectorAll('.sender-toggle button');
    btns.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.sender === type);
    });
  }

  function addMessage() {
    var textEl = getEl('mockupMsgText');
    var text = textEl.value.trim();
    if (!text) return;

    var timeEl = getEl('mockupMsgTime');
    var statusEl = getEl('mockupMsgStatus');

    messages.push({
      sender: currentSender,
      text: text,
      time: timeEl.value || getCurrentTime(),
      status: currentSender === 'sent' ? (statusEl.value || 'read') : ''
    });

    textEl.value = '';
    renderMessageList();
    renderChatPreview();
  }

  function removeMessage(index) {
    messages.splice(index, 1);
    renderMessageList();
    renderChatPreview();
  }

  function renderMessageList() {
    var list = getEl('mockupMessageList');
    if (!list) return;

    if (messages.length === 0) {
      list.innerHTML = '<div style="color:var(--text-dark); font-size:0.85rem; font-style:italic; padding:1rem; text-align:center;">No messages yet. Add one above.</div>';
      return;
    }

    list.innerHTML = messages.map(function(msg, i) {
      var senderLabel = msg.sender === 'sent' ? 'You' : 'Them';
      return '<div class="message-list-item">' +
        '<span class="msg-sender">' + senderLabel + '</span>' +
        '<span class="msg-text">' + escapeHtml(msg.text) + '</span>' +
        '<button class="msg-remove" onclick="mockupRemoveMessage(' + i + ')" title="Remove">&times;</button>' +
        '</div>';
    }).join('');
  }

  function getStatusIcon(status) {
    switch (status) {
      case 'sent': return '&#10003;';
      case 'delivered': return '&#10003;&#10003;';
      case 'read': return '<span class="wa-msg-status read">&#10003;&#10003;</span>';
      default: return '';
    }
  }

  function renderChatPreview() {
    var frame = getEl('mockupChatFrame');
    if (!frame) return;

    var name = getContactName();
    var status = getContactStatus();
    var initial = name.charAt(0).toUpperCase();

    frame.className = 'wa-chat-frame' + (chatTheme === 'dark' ? ' dark-theme' : '');

    var headerHtml = '<div class="wa-chat-header">' +
      '<div class="wa-chat-avatar">' + initial + '</div>' +
      '<div class="wa-chat-contact">' +
        '<div class="wa-chat-contact-name">' + escapeHtml(name) + '</div>' +
        '<div class="wa-chat-contact-status">' + escapeHtml(status) + '</div>' +
      '</div>' +
      '</div>';

    var bodyHtml;
    if (messages.length === 0) {
      bodyHtml = '<div class="wa-chat-body"><div class="wa-chat-empty">Add messages to see the preview</div></div>';
    } else {
      bodyHtml = '<div class="wa-chat-body">' +
        messages.map(function(msg) {
          var cls = msg.sender === 'sent' ? 'wa-msg wa-msg-sent' : 'wa-msg wa-msg-received';
          var statusHtml = msg.status ? '<span class="wa-msg-status' + (msg.status === 'read' ? ' read' : '') + '">' + getStatusIcon(msg.status).replace(/<[^>]*>/g, function(m) { return m; }) + '</span>' : '';

          // Re-do status icon without nested HTML issues
          var statusSpan = '';
          if (msg.status === 'sent') {
            statusSpan = '<span class="wa-msg-status">&#10003;</span>';
          } else if (msg.status === 'delivered') {
            statusSpan = '<span class="wa-msg-status">&#10003;&#10003;</span>';
          } else if (msg.status === 'read') {
            statusSpan = '<span class="wa-msg-status read">&#10003;&#10003;</span>';
          }

          return '<div class="' + cls + '">' +
            '<div class="wa-msg-text">' + escapeHtml(msg.text) + '</div>' +
            '<div class="wa-msg-meta">' +
              '<span class="wa-msg-time">' + escapeHtml(msg.time) + '</span>' +
              statusSpan +
            '</div>' +
          '</div>';
        }).join('') +
        '</div>';
    }

    frame.innerHTML = headerHtml + bodyHtml;

    // Auto-scroll to bottom
    var body = frame.querySelector('.wa-chat-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function setChatTheme(theme) {
    chatTheme = theme;
    var btns = document.querySelectorAll('.theme-select button');
    btns.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    renderChatPreview();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function exportAsPng() {
    var frame = getEl('mockupChatFrame');
    if (!frame || messages.length === 0) {
      if (window.showToast) window.showToast('Add some messages first!');
      return;
    }

    if (typeof html2canvas === 'undefined') {
      if (window.showToast) window.showToast('Loading export library...');
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.onload = function() { doExport(frame); };
      script.onerror = function() {
        if (window.showToast) window.showToast('Failed to load export library. Please try again.');
      };
      document.head.appendChild(script);
    } else {
      doExport(frame);
    }
  }

  function doExport(frame) {
    html2canvas(frame, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    }).then(function(canvas) {
      var link = document.createElement('a');
      link.download = 'whatsapp-chat-mockup.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      if (window.showToast) window.showToast('Downloaded!');
    }).catch(function() {
      if (window.showToast) window.showToast('Export failed. Please try again.');
    });
  }

  function clearAllMessages() {
    messages = [];
    renderMessageList();
    renderChatPreview();
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    renderMessageList();
    renderChatPreview();

    // Enter key to add message
    var textInput = getEl('mockupMsgText');
    if (textInput) {
      textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          addMessage();
        }
      });
    }

    // Update preview on contact name/status change
    var nameInput = getEl('mockupContactName');
    var statusInput = getEl('mockupContactStatus');
    if (nameInput) nameInput.addEventListener('input', renderChatPreview);
    if (statusInput) statusInput.addEventListener('input', renderChatPreview);
  });

  // Expose globally
  window.mockupSetSender = setSender;
  window.mockupAddMessage = addMessage;
  window.mockupRemoveMessage = removeMessage;
  window.mockupSetTheme = setChatTheme;
  window.mockupExportPng = exportAsPng;
  window.mockupClearAll = clearAllMessages;

})();
