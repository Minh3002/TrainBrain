/* ==========================================================================
   MEMORY & MENTAL MATH APP - SCRIPT ENGINE
   Complete implementation of Math Logic, Word Memory, Charts, Settings & Bottom Nav
   ========================================================================== */

(function () {
    'use strict';

    const WORD_DATABASE = [
        "Táo Đỏ", "Xe Máy", "Cà Phê", "Mèo Con", "Ngôi Sao",
        "Trái Đất", "Mặt Trời", "Bút Viết", "Sách Vở", "Mưa Rào",
        "Cánh Đồng", "Nắng Sớm", "Đèn Đường", "Đồng Hồ", "Xe Đạp",
        "Điển Hình", "Hoàn Hảo", "Cây Cối", "Sông Núi", "Mây Trắng",
        "Quả Táo", "Con Hổ", "Chim Én", "Bông Hoa", "Quạt Máy",
        "Bàn Học", "Cửa Sổ", "Máy Tính", "Điện Thoại", "Tai Nghe",
        "Blue Sky", "Green Tea", "Red Rose", "Sun Light", "Sweet Home",
        "Big Tree", "Wild Flower", "Golden Hour", "Moon Light", "Fresh Air",
        "Hot Coffee", "Fast Car", "Smart Phone", "High Mountain", "Deep Ocean"
    ];

    // ==========================================================================
    // 1. SETTINGS MANAGER
    // ==========================================================================
    class SettingsManager {
        static STORAGE_KEY = 'math_brain_app_settings';

        static getDefaultSettings() {
            return {
                defaultOp: 'mix',
                defaultQCount: 10,
                defaultTimeLimit: 10,
                soundEnabled: false
            };
        }

        static getSettings() {
            try {
                const data = localStorage.getItem(this.STORAGE_KEY);
                return data ? { ...this.getDefaultSettings(), ...JSON.parse(data) } : this.getDefaultSettings();
            } catch (e) {
                console.error('Error reading settings from LocalStorage:', e);
                return this.getDefaultSettings();
            }
        }

        static saveSettings(settings) {
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
            } catch (e) {
                console.error('Error saving settings to LocalStorage:', e);
            }
        }
    }

    // ==========================================================================
    // 2. SOUND FX ENGINE
    // ==========================================================================
    class SoundFX {
        constructor() {
            this.ctx = null;
            this.muted = localStorage.getItem('math_brain_sound_muted') === 'true';
            this.updateIconState();
        }

        initContext() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        toggleMute() {
            this.muted = !this.muted;
            localStorage.setItem('math_brain_sound_muted', this.muted);
            this.updateIconState();

            // Sync setting checkbox if present
            const toggleInp = document.getElementById('setting-sound-toggle');
            if (toggleInp) toggleInp.checked = !this.muted;
        }

        setMuted(isMuted) {
            this.muted = isMuted;
            localStorage.setItem('math_brain_sound_muted', this.muted);
            this.updateIconState();
        }

        updateIconState() {
            const iconOn = document.getElementById('sound-icon-on');
            const iconOff = document.getElementById('sound-icon-off');
            if (iconOn && iconOff) {
                if (this.muted) {
                    iconOn.classList.add('hidden');
                    iconOff.classList.remove('hidden');
                } else {
                    iconOn.classList.remove('hidden');
                    iconOff.classList.add('hidden');
                }
            }
        }

        playClick() {
            if (this.muted) return;
            this.initContext();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(500, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        }

        playCorrect() {
            if (this.muted) return;
            this.initContext();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc1.type = 'triangle';
            osc2.type = 'sine';
            osc1.frequency.setValueAtTime(523.25, now);
            osc1.frequency.setValueAtTime(659.25, now + 0.08);
            osc1.frequency.setValueAtTime(783.99, now + 0.16);
            osc2.frequency.setValueAtTime(1046.50, now + 0.16);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.4);
            osc2.stop(now + 0.4);
        }

        playWrong() {
            if (this.muted) return;
            this.initContext();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.linearRampToValueAtTime(100, now + 0.25);

            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.25);
        }

        playFanfare() {
            if (this.muted) return;
            this.initContext();
            if (!this.ctx) return;
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const now = this.ctx.currentTime + idx * 0.1;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.3);
            });
        }
    }

    const soundEngine = new SoundFX();

    // ==========================================================================
    // 3. MATH GENERATOR ENGINE
    // ==========================================================================
    class MathGenerator {
        static getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        static generate(opType) {
            let actualOp = opType;
            if (opType === 'mix' || opType === 'mul' || opType === 'div') {
                const ops = ['add', 'sub'];
                actualOp = ops[this.getRandomInt(0, ops.length - 1)];
            }

            let num1 = 0, num2 = 0, answer = 0, symbol = '+', name = 'Phép Cộng (1 Chữ Số)';

            switch (actualOp) {
                case 'add':
                    num1 = this.getRandomInt(0, 9);
                    num2 = this.getRandomInt(0, 9);
                    answer = num1 + num2;
                    symbol = '+';
                    name = 'Phép Cộng (1 Chữ Số)';
                    break;
                case 'sub':
                default:
                    num1 = this.getRandomInt(0, 9);
                    num2 = this.getRandomInt(0, num1);
                    answer = num1 - num2;
                    symbol = '-';
                    name = 'Phép Trừ (1 Chữ Số)';
                    break;
            }

            const choices = this.generateChoices(answer);

            return {
                num1, num2, symbol, opName: name, answer, choices,
                exprStr: `${num1} ${symbol} ${num2} = ?`
            };
        }

        static generateChoices(correctAnswer) {
            const set = new Set([correctAnswer]);
            const offsets = [-1, 1, -2, 2, -3, 3];
            
            while (set.size < 4) {
                const randOffset = offsets[this.getRandomInt(0, offsets.length - 1)];
                const candidate = correctAnswer + randOffset;
                if (candidate >= 0 && candidate <= 18 && candidate !== correctAnswer) {
                    set.add(candidate);
                } else {
                    set.add(this.getRandomInt(0, 18));
                }
            }

            const choices = Array.from(set);
            for (let i = choices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [choices[i], choices[j]] = [choices[j], choices[i]];
            }
            return choices;
        }
    }

    // ==========================================================================
    // 4. HANDWRITING CANVAS & GEMINI REST API VISION RECOGNIZER
    // ==========================================================================

    /**
     * Single HandwritingCanvas with Google Gemini REST API (gemini-1.5-flash)
     */
    class HandwritingCanvas {
        constructor(canvasId, onRecognizedCallback) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.onRecognized = onRecognizedCallback;
            this.isDrawing = false;
            this.isAnalyzing = false;
            this.strokes = [];
            this.currentStroke = [];
            this.lastPoint = null;
            this.setupCanvas();
            this.bindEvents();
        }

        setupCanvas() {
            if (!this.canvas) return;
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            this.width = rect.width || 360;
            this.height = rect.height || 180;
            this.canvas.width = this.width * dpr;
            this.canvas.height = this.height * dpr;
            this.ctx.scale(dpr, dpr);
            this.clear();
        }

        clear() {
            if (!this.ctx) return;
            this.ctx.fillStyle = '#0a0e1a';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([5, 5]);
            this.ctx.strokeRect(15, 15, this.width - 30, this.height - 30);
            this.ctx.setLineDash([]);
            this.strokes = [];
            this.currentStroke = [];
            this.lastPoint = null;

            const badge = document.getElementById('canvas-recognized-text');
            if (badge) {
                badge.textContent = 'Nhận diện: --';
                badge.classList.remove('warning');
            }

            if (this.onRecognized) this.onRecognized('');
        }

        bindEvents() {
            const getPos = (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                return { x: clientX - rect.left, y: clientY - rect.top };
            };

            const startDraw = (e) => {
                e.preventDefault();
                soundEngine.initContext();
                this.isDrawing = true;
                const pos = getPos(e);
                this.lastPoint = pos;
                this.currentStroke = [pos];
                this.strokes.push(this.currentStroke);

                this.ctx.beginPath();
                this.ctx.moveTo(pos.x, pos.y);
                this.ctx.strokeStyle = '#06b6d4';
                this.ctx.lineWidth = 10;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.shadowColor = 'rgba(6, 182, 212, 0.7)';
                this.ctx.shadowBlur = 10;
            };

            const moveDraw = (e) => {
                if (!this.isDrawing) return;
                e.preventDefault();
                const pos = getPos(e);
                this.currentStroke.push(pos);

                const midPoint = {
                    x: (this.lastPoint.x + pos.x) / 2,
                    y: (this.lastPoint.y + pos.y) / 2
                };

                this.ctx.quadraticCurveTo(this.lastPoint.x, this.lastPoint.y, midPoint.x, midPoint.y);
                this.ctx.stroke();
                this.lastPoint = pos;
            };

            const endDraw = () => {
                if (!this.isDrawing) return;
                this.isDrawing = false;
                this.ctx.shadowBlur = 0;
                // Tuyệt đối KHÔNG tự động gọi API analyzeDigit() khi kết thúc nét vẽ để tiết kiệm hạn mức API
            };

            this.canvas.addEventListener('mousedown', startDraw);
            this.canvas.addEventListener('mousemove', moveDraw);
            this.canvas.addEventListener('mouseup', endDraw);
            this.canvas.addEventListener('mouseleave', endDraw);

            this.canvas.addEventListener('touchstart', startDraw, { passive: false });
            this.canvas.addEventListener('touchmove', moveDraw, { passive: false });
            this.canvas.addEventListener('touchend', endDraw);
        }

        async analyzeDigit() {
            const badge = document.getElementById('canvas-recognized-text');
            const recBtn = document.getElementById('canvas-recognize-btn');

            if (this.isAnalyzing) return;

            if (this.strokes.length === 0) {
                if (badge) {
                    badge.textContent = 'Hãy vẽ nét trước!';
                    badge.classList.add('warning');
                }
                if (this.onRecognized) this.onRecognized('');
                return;
            }

            this.isAnalyzing = true;

            // Khóa nút bấm và cập nhật UI chống click liên tục (Debounce / Throttle)
            if (recBtn) {
                recBtn.disabled = true;
                recBtn.style.opacity = '0.7';
                recBtn.dataset.originalHtml = recBtn.innerHTML;
                recBtn.innerHTML = '⏳ Đang gửi lên AI...';
            }

            if (badge) {
                badge.textContent = 'Gemini đang đọc...';
                badge.classList.remove('warning');
            }

            try {
                // 1. Chuyển canvas thành base64 JPEG tối ưu và nén dữ liệu gọn gàng
                const dataUrl = this.canvas.toDataURL('image/jpeg', 0.85);
                const base64Image = dataUrl.split(',')[1];

                // 2. Cấu hình API Key và Google Gen AI SDK
                const apiKey = localStorage.getItem('gemini_api_key') || "YOUR_GEMINI_API_KEY";

                // Dynamic import Google Gen AI SDK từ importmap @google/genai
                const { GoogleGenAI } = await import('@google/genai');
                const ai = new GoogleGenAI({ apiKey });

                // 3. Gọi SDK nhận diện hình ảnh với model gemini-3.6-flash
                const response = await ai.models.generateContent({
                    model: 'gemini-3.6-flash',
                    contents: [
                        {
                            inlineData: {
                                mimeType: 'image/jpeg',
                                data: base64Image
                            }
                        },
                        {
                            text: 'Hãy đọc chữ số viết tay từ 0 đến 9 có trong bức ảnh này. Chỉ trả về đúng giá trị số nguyên kết quả (ví dụ: 5 hoặc 8), tuyệt đối không kèm theo bất kỳ từ hay ký tự nào khác.'
                        }
                    ]
                });

                // 4. Trích xuất kết quả trả về từ Google Gen AI SDK
                const aiText = response?.text ? response.text.trim() : '';
                const recognizedNumber = aiText ? aiText.replace(/\D/g, '') : '';

                if (recognizedNumber !== '') {
                    if (badge) {
                        badge.textContent = `Nhận diện: ${recognizedNumber}`;
                        badge.classList.remove('warning');
                    }
                    if (this.onRecognized) this.onRecognized(recognizedNumber);
                } else {
                    if (badge) {
                        badge.textContent = 'Không rõ, hãy thử lại!';
                        badge.classList.add('warning');
                    }
                }
            } catch (error) {
                console.error('Lỗi khi gọi Gemini API:', error);
                const errStr = String(error?.message || error?.status || error || '');
                const isQuotaError = errStr.includes('429') || errStr.includes('RESOURCE_EXHAUSTED') || errStr.includes('Quota') || errStr.includes('rate limit');

                if (badge) {
                    if (isQuotaError) {
                        badge.textContent = '⚠️ Hạn mức đầy (Chờ vài giây thử lại)';
                    } else {
                        badge.textContent = '❌ Lỗi kết nối AI (Thử lại)';
                    }
                    badge.classList.add('warning');
                }
            } finally {
                // Khóa nút bấm trong 2.5 giây chống spam click liên tục gây lỗi 429
                setTimeout(() => {
                    this.isAnalyzing = false;
                    if (recBtn) {
                        recBtn.disabled = false;
                        recBtn.style.opacity = '1';
                        recBtn.innerHTML = recBtn.dataset.originalHtml || '🔍 AI Nhận Diện Chữ Số';
                    }
                }, 2500);
            }
        }
    }

    // ==========================================================================
    // 5. STORAGE & TRACKING STATS MANAGER
    // ==========================================================================
    class StatsManager {
        static STORAGE_KEY = 'math_brain_stats_history';

        static getHistory() {
            try {
                const data = localStorage.getItem(this.STORAGE_KEY);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                console.error('Error reading LocalStorage stats:', e);
                return [];
            }
        }

        static saveSession(sessionData) {
            const history = this.getHistory();
            history.unshift(sessionData);
            if (history.length > 100) history.pop();
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
            } catch (e) {
                console.error('Error saving LocalStorage stats:', e);
            }
        }

        static clearHistory() {
            localStorage.removeItem(this.STORAGE_KEY);
        }

        static getFilteredStats(filterType = 'day') {
            const history = this.getHistory();
            if (history.length === 0) {
                return { totalGames: 0, totalQuestions: 0, avgAccuracy: 0, avgSpeed: 0, filteredHistory: [] };
            }

            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1))).setHours(0,0,0,0);
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

            const filteredHistory = history.filter(item => {
                const itemTime = item.id || 0;
                if (filterType === 'day') return itemTime >= startOfDay;
                if (filterType === 'week') return itemTime >= startOfWeek;
                if (filterType === 'month') return itemTime >= startOfMonth;
                return true;
            });

            const targetList = filteredHistory.length > 0 ? filteredHistory : history;

            let totalQ = 0, totalCorrect = 0, totalTime = 0;
            targetList.forEach(item => {
                totalQ += item.totalQuestions || 0;
                totalCorrect += item.correctCount || 0;
                totalTime += item.totalTimeSeconds || 0;
            });

            const avgAccuracy = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
            const avgSpeed = totalQ > 0 ? (totalTime / totalQ).toFixed(1) : 0;

            return {
                totalGames: targetList.length,
                totalQuestions: totalQ,
                avgAccuracy,
                avgSpeed,
                filteredHistory: targetList
            };
        }
    }

    // ==========================================================================
    // 6. APP CONTROLLER & SPA ROUTER
    // ==========================================================================
    class AppController {
        constructor() {
            const savedSettings = SettingsManager.getSettings();

            this.config = {
                activeMainMode: 'math',
                opType: savedSettings.defaultOp,
                questionCount: savedSettings.defaultQCount,
                timeLimitPerQuestion: savedSettings.defaultTimeLimit
            };

            this.quizState = {
                active: false, currentQIndex: 0, questions: [], userAnswers: [],
                correctCount: 0, wrongCount: 0, currentStreak: 0, maxStreak: 0,
                userAnswerInput: '', timerInterval: null, timeRemaining: 15,
                questionStartTime: 0, sessionStartTime: 0
            };

            this.wordMemoryState = {
                active: false, currentWords: [], memorizeTimer: null,
                timeRemaining: 120, memorizeStartTime: 0
            };

            this.chartInstance = null;
            this.handwritingCanvas = null;
            
            // Apply saved sound setting
            soundEngine.setMuted(!savedSettings.soundEnabled);

            this.initDOM();
            this.applySavedSettingsUI(savedSettings);
            this.bindEvents();
            this.updateQuickStats();
        }

        initDOM() {
            this.container = document.getElementById('app-container');
            this.screens = {
                home: document.getElementById('home-screen'),
                quiz: document.getElementById('quiz-screen'),
                wordMemory: document.getElementById('word-memory-screen'),
                result: document.getElementById('result-screen'),
                settings: document.getElementById('settings-screen')
            };

            this.handwritingCanvas = new HandwritingCanvas('handwriting-canvas', (val) => {
                if (val !== '') this.setUserAnswer(val);
            });
        }

        switchScreen(screenName) {
            // Update active screen
            Object.keys(this.screens).forEach(key => {
                if (key === screenName) this.screens[key].classList.add('active');
                else this.screens[key].classList.remove('active');
            });

            // Update Bottom Nav active state
            document.querySelectorAll('.bnav-btn').forEach(btn => {
                const navTarget = btn.dataset.nav;
                if (navTarget === screenName || (screenName === 'wordMemory' && navTarget === 'home')) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Hide bottom nav during active quiz/memory session
            if (screenName === 'quiz' || screenName === 'wordMemory') {
                this.container?.classList.add('in-quiz-mode');
            } else {
                this.container?.classList.remove('in-quiz-mode');
            }

            window.scrollTo(0, 0);
        }

        applySavedSettingsUI(settings) {
            // Home screen choices
            document.querySelectorAll('.op-chip').forEach(c => {
                if (c.dataset.op === settings.defaultOp) c.classList.add('active');
                else c.classList.remove('active');
            });

            document.querySelectorAll('#question-count-segment .segment-btn').forEach(b => {
                if (parseInt(b.dataset.count, 10) === settings.defaultQCount) b.classList.add('active');
                else b.classList.remove('active');
            });

            document.querySelectorAll('#time-limit-segment .segment-btn').forEach(b => {
                if (parseInt(b.dataset.time, 10) === settings.defaultTimeLimit) b.classList.add('active');
                else b.classList.remove('active');
            });

            // Settings Screen Form UI
            document.querySelectorAll('[data-set-op]').forEach(c => {
                if (c.dataset.setOp === settings.defaultOp) c.classList.add('active');
                else c.classList.remove('active');
            });

            document.querySelectorAll('#settings-qcount-segment .segment-btn').forEach(b => {
                if (parseInt(b.dataset.setCount, 10) === settings.defaultQCount) b.classList.add('active');
                else b.classList.remove('active');
            });

            document.querySelectorAll('#settings-time-segment .segment-btn').forEach(b => {
                if (parseInt(b.dataset.setTime, 10) === settings.defaultTimeLimit) b.classList.add('active');
                else b.classList.remove('active');
            });

            const soundToggle = document.getElementById('setting-sound-toggle');
            if (soundToggle) soundToggle.checked = settings.soundEnabled;
        }

        bindEvents() {
            document.getElementById('sound-toggle-btn')?.addEventListener('click', () => soundEngine.toggleMute());

            // Header Brand Logo
            document.getElementById('brand-home-btn')?.addEventListener('click', () => {
                if (this.quizState.active || this.wordMemoryState.active) {
                    if (confirm('Bạn có chắc muốn thoát phiên làm bài hiện tại?')) {
                        clearInterval(this.quizState.timerInterval);
                        clearInterval(this.wordMemoryState.memorizeTimer);
                        this.switchScreen('home');
                    }
                } else {
                    this.switchScreen('home');
                }
            });

            // Header Settings Icon
            document.getElementById('settings-header-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.switchScreen('settings');
            });

            // Bottom Navigation Bar Items
            document.getElementById('bnav-home-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.switchScreen('home');
            });

            document.getElementById('bnav-stats-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.renderStatsModal('day');
            });

            document.getElementById('bnav-settings-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.switchScreen('settings');
            });

            // Main Mode Switcher
            document.querySelectorAll('.main-mode-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('.main-mode-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.config.activeMainMode = btn.dataset.mode;

                    const mathPanel = document.getElementById('math-config-panel');
                    const memPanel = document.getElementById('memory-config-panel');
                    const startText = document.getElementById('start-btn-text');

                    if (this.config.activeMainMode === 'word-memory') {
                        mathPanel?.classList.add('hidden');
                        memPanel?.classList.remove('hidden');
                        if (startText) startText.textContent = 'Bắt Đầu Kiểm Tra Trí Nhớ';
                    } else {
                        mathPanel?.classList.remove('hidden');
                        memPanel?.classList.add('hidden');
                        if (startText) startText.textContent = 'Bắt Đầu Luyện Toán';
                    }
                });
            });

            // Op chips home
            document.querySelectorAll('#math-config-panel .op-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('#math-config-panel .op-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    this.config.opType = chip.dataset.op;
                });
            });

            // Segment controls home
            document.querySelectorAll('#question-count-segment .segment-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('#question-count-segment .segment-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.config.questionCount = parseInt(btn.dataset.count, 10);
                });
            });

            document.querySelectorAll('#time-limit-segment .segment-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('#time-limit-segment .segment-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.config.timeLimitPerQuestion = parseInt(btn.dataset.time, 10);
                });
            });

            // Start Quiz / Start Memory Test
            const startHandler = () => {
                soundEngine.playClick();
                if (this.config.activeMainMode === 'word-memory') {
                    this.startWordMemoryTest();
                } else {
                    this.startQuiz();
                }
            };
            document.getElementById('start-btn')?.addEventListener('click', startHandler);
            document.getElementById('start-quiz-btn')?.addEventListener('click', startHandler);

            // Stats Modal & Charting
            const openStatsHandler = () => {
                soundEngine.playClick();
                this.renderStatsModal('day');
            };
            document.getElementById('view-stats-btn')?.addEventListener('click', openStatsHandler);
            document.getElementById('stats-header-btn')?.addEventListener('click', openStatsHandler);

            document.querySelectorAll('.st-filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('.st-filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.renderStatsModal(btn.dataset.filter);
                });
            });

            const closeStatsHandler = () => {
                soundEngine.playClick();
                document.getElementById('stats-modal')?.classList.add('hidden');
            };
            document.getElementById('close-stats-modal-btn')?.addEventListener('click', closeStatsHandler);
            document.getElementById('close-stats-btn-bottom')?.addEventListener('click', closeStatsHandler);

            document.getElementById('clear-history-btn')?.addEventListener('click', () => {
                if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử luyện tập?')) {
                    soundEngine.playClick();
                    StatsManager.clearHistory();
                    this.renderStatsModal('day');
                    this.updateQuickStats();
                }
            });

            // Settings Screen Controls
            document.querySelectorAll('[data-set-op]').forEach(chip => {
                chip.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('[data-set-op]').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                });
            });

            document.querySelectorAll('#settings-qcount-segment .segment-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('#settings-qcount-segment .segment-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });

            document.querySelectorAll('#settings-time-segment .segment-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('#settings-time-segment .segment-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });

            document.getElementById('save-settings-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.saveSettingsFromUI();
            });

            document.getElementById('reset-settings-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                if (confirm('Khôi phục cài đặt ứng dụng về mặc định?')) {
                    const defaultSet = SettingsManager.getDefaultSettings();
                    SettingsManager.saveSettings(defaultSet);
                    this.applySavedSettingsUI(defaultSet);
                    this.showSettingsToast('🔄 Đã khôi phục cài đặt mặc định!');
                }
            });

            // Quiz Answer Tabs
            document.querySelectorAll('.tab-btn').forEach(tabBtn => {
                tabBtn.addEventListener('click', () => {
                    soundEngine.playClick();
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                    tabBtn.classList.add('active');
                    const targetId = tabBtn.dataset.target;
                    document.getElementById(targetId)?.classList.add('active');
                    if (targetId === 'tab-canvas') setTimeout(() => this.handwritingCanvas?.setupCanvas(), 50);
                });
            });

            // Numpad vs MCQ
            const numpadBtn = document.getElementById('mode-numpad-btn');
            const mcqBtn = document.getElementById('mode-mcq-btn');
            const numpadView = document.getElementById('numpad-view');
            const mcqView = document.getElementById('mcq-view');

            numpadBtn?.addEventListener('click', () => {
                soundEngine.playClick();
                numpadBtn.classList.add('active');
                mcqBtn?.classList.remove('active');
                numpadView?.classList.remove('hidden');
                mcqView?.classList.add('hidden');
            });

            mcqBtn?.addEventListener('click', () => {
                soundEngine.playClick();
                mcqBtn.classList.add('active');
                numpadBtn?.classList.remove('active');
                mcqView?.classList.remove('hidden');
                numpadView?.classList.add('hidden');
            });

            document.querySelectorAll('.num-btn[data-val]').forEach(btn => {
                btn.addEventListener('click', () => {
                    soundEngine.playClick();
                    if (this.quizState.userAnswerInput.length < 4) this.setUserAnswer(this.quizState.userAnswerInput + btn.dataset.val);
                });
            });

            document.getElementById('btn-clear-num')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.setUserAnswer('');
            });

            document.getElementById('btn-backspace')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.setUserAnswer(this.quizState.userAnswerInput.slice(0, -1));
            });

            document.getElementById('canvas-clear-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.handwritingCanvas?.clear();
                this.setUserAnswer('');
            });

            document.getElementById('canvas-recognize-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.handwritingCanvas?.analyzeDigit();
            });

            document.getElementById('submit-answer-btn')?.addEventListener('click', () => this.submitCurrentAnswer());
            document.getElementById('skip-q-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.skipCurrentQuestion();
            });

            // Word Memory Phase Buttons
            document.getElementById('wm-early-submit-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.transitionToWordRecallPhase();
            });

            document.getElementById('wm-finish-recall-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.scoreWordMemoryTest();
            });

            // Result Actions
            document.getElementById('retry-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.startQuiz();
            });

            document.getElementById('result-home-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.switchScreen('home');
            });

            document.getElementById('wm-retry-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.startWordMemoryTest();
            });

            document.getElementById('wm-home-btn')?.addEventListener('click', () => {
                soundEngine.playClick();
                this.switchScreen('home');
            });
        }

        saveSettingsFromUI() {
            const activeOpBtn = document.querySelector('[data-set-op].active');
            const activeCountBtn = document.querySelector('#settings-qcount-segment .segment-btn.active');
            const activeTimeBtn = document.querySelector('#settings-time-segment .segment-btn.active');
            const soundToggle = document.getElementById('setting-sound-toggle');

            const newSettings = {
                defaultOp: activeOpBtn ? activeOpBtn.dataset.setOp : 'mix',
                defaultQCount: activeCountBtn ? parseInt(activeCountBtn.dataset.setCount, 10) : 40,
                defaultTimeLimit: activeTimeBtn ? parseInt(activeTimeBtn.dataset.setTime, 10) : 15,
                soundEnabled: soundToggle ? soundToggle.checked : true
            };

            SettingsManager.saveSettings(newSettings);

            // Apply to active config
            this.config.opType = newSettings.defaultOp;
            this.config.questionCount = newSettings.defaultQCount;
            this.config.timeLimitPerQuestion = newSettings.defaultTimeLimit;
            soundEngine.setMuted(!newSettings.soundEnabled);

            // Sync home screen UI
            this.applySavedSettingsUI(newSettings);
            this.showSettingsToast('✅ Đã lưu cấu hình cài đặt vĩnh viễn!');
        }

        showSettingsToast(msg) {
            const toast = document.getElementById('settings-toast');
            if (toast) {
                toast.textContent = msg;
                toast.classList.remove('hidden');
                setTimeout(() => toast.classList.add('hidden'), 3000);
            }
        }

        setUserAnswer(val) {
            this.quizState.userAnswerInput = val;
            const previewEl = document.getElementById('user-answer-preview');
            if (previewEl) {
                if (val === '') previewEl.innerHTML = `<span class="placeholder">Nhập hoặc vẽ câu trả lời...</span>`;
                else previewEl.textContent = val;
            }
        }

        // ==========================================================================
        // 7. WORD MEMORY ENGINE
        // ==========================================================================
        startWordMemoryTest() {
            const shuffled = [...WORD_DATABASE].sort(() => 0.5 - Math.random());
            const selected20 = shuffled.slice(0, 20);

            this.wordMemoryState = {
                active: true,
                currentWords: selected20,
                memorizeTimer: null,
                timeRemaining: 120,
                memorizeStartTime: Date.now()
            };

            document.getElementById('wm-memorize-phase')?.classList.remove('hidden');
            document.getElementById('wm-recall-phase')?.classList.add('hidden');
            document.getElementById('wm-result-phase')?.classList.add('hidden');
            document.getElementById('wm-status-text').textContent = 'Giai đoạn 1: Ghi nhớ 20 từ (2 phút)';

            const wordsGrid = document.getElementById('wm-words-grid');
            if (wordsGrid) {
                wordsGrid.innerHTML = '';
                selected20.forEach((w, idx) => {
                    const chip = document.createElement('div');
                    chip.className = 'word-chip';
                    chip.innerHTML = `
                        <span class="word-num">${idx + 1}</span>
                        <span class="word-text">${w}</span>
                    `;
                    wordsGrid.appendChild(chip);
                });
            }

            this.switchScreen('wordMemory');
            this.startMemorizeTimer();
        }

        startMemorizeTimer() {
            clearInterval(this.wordMemoryState.memorizeTimer);
            const timerText = document.getElementById('wm-timer-text');
            
            const updateTimerUI = () => {
                const rem = this.wordMemoryState.timeRemaining;
                const mins = Math.floor(rem / 60);
                const secs = rem % 60;
                const fmtStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
                if (timerText) timerText.textContent = fmtStr;
            };

            updateTimerUI();

            this.wordMemoryState.memorizeTimer = setInterval(() => {
                this.wordMemoryState.timeRemaining--;
                updateTimerUI();

                if (this.wordMemoryState.timeRemaining <= 0) {
                    clearInterval(this.wordMemoryState.memorizeTimer);
                    soundEngine.playWrong();
                    this.transitionToWordRecallPhase();
                }
            }, 1000);
        }

        transitionToWordRecallPhase() {
            clearInterval(this.wordMemoryState.memorizeTimer);

            document.getElementById('wm-memorize-phase')?.classList.add('hidden');
            document.getElementById('wm-recall-phase')?.classList.remove('hidden');
            document.getElementById('wm-status-text').textContent = 'Giai đoạn 2: Điền lại các từ đã nhớ';

            const recallGrid = document.getElementById('wm-recall-grid');
            if (recallGrid) {
                recallGrid.innerHTML = '';
                for (let i = 0; i < 20; i++) {
                    const item = document.createElement('div');
                    item.className = 'recall-item';
                    item.innerHTML = `
                        <span class="recall-num">${i + 1}.</span>
                        <input type="text" class="recall-input" data-idx="${i}" placeholder="Từ số ${i + 1}..." autocomplete="off">
                    `;
                    recallGrid.appendChild(item);
                }
            }
        }

        scoreWordMemoryTest() {
            const inputs = document.querySelectorAll('.recall-input');
            const userEnteredWords = [];
            inputs.forEach(inp => {
                userEnteredWords.push(inp.value.trim());
            });

            const normalize = (str) => str.toLowerCase().replace(/\s+/g, ' ').trim();
            const originalNormalized = this.wordMemoryState.currentWords.map(w => normalize(w));

            let correctCount = 0;
            const comparisonList = [];

            this.wordMemoryState.currentWords.forEach((targetWord, idx) => {
                const targetNorm = normalize(targetWord);
                const userVal = userEnteredWords[idx] || '';
                const userNorm = normalize(userVal);

                const isMatch = userNorm !== '' && (userNorm === targetNorm || originalNormalized.includes(userNorm));

                if (isMatch) correctCount++;

                comparisonList.push({
                    targetWord,
                    enteredWord: userVal !== '' ? userVal : '(Không điền)',
                    isMatch
                });
            });

            const totalTimeSec = Math.round((Date.now() - this.wordMemoryState.memorizeStartTime) / 1000);
            const accuracy = Math.round((correctCount / 20) * 100);

            const sessionRecord = {
                id: Date.now(),
                dateStr: new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
                opType: 'word-memory',
                opName: '🧠 Nhớ Từ Cuối Tuần',
                totalQuestions: 20,
                correctCount,
                wrongCount: 20 - correctCount,
                accuracy,
                totalTimeSeconds: totalTimeSec,
                avgSpeed: (totalTimeSec / 20).toFixed(1),
                maxStreak: correctCount,
                questions: comparisonList
            };

            StatsManager.saveSession(sessionRecord);
            this.updateQuickStats();

            document.getElementById('wm-recall-phase')?.classList.add('hidden');
            document.getElementById('wm-result-phase')?.classList.remove('hidden');

            document.getElementById('wm-res-correct-count').textContent = `${correctCount} / 20`;
            document.getElementById('wm-res-accuracy-pct').textContent = `${accuracy}% chính xác`;
            const mins = Math.floor(totalTimeSec / 60);
            const secs = totalTimeSec % 60;
            document.getElementById('wm-res-memo-time').textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

            const compListEl = document.getElementById('wm-comparison-list');
            if (compListEl) {
                compListEl.innerHTML = '';
                comparisonList.forEach((item, idx) => {
                    const row = document.createElement('div');
                    row.className = `wm-comp-row ${item.isMatch ? 'is-correct' : 'is-missed'}`;
                    row.innerHTML = `
                        <div class="wm-target-word">${idx + 1}. ${item.targetWord}</div>
                        <div class="wm-entered-word">${item.isMatch ? '✅ ' + item.enteredWord : '❌ Gõ: ' + item.enteredWord}</div>
                    `;
                    compListEl.appendChild(row);
                });
            }

            if (accuracy >= 80 && window.confetti) {
                window.confetti({ particleCount: 90, spread: 70 });
                soundEngine.playFanfare();
            } else {
                soundEngine.playCorrect();
            }
        }

        setUserAnswer(val) {
            this.quizState.userAnswerInput = val;
            const preview = document.getElementById('user-answer-preview');
            if (preview) {
                if (val !== '') {
                    preview.innerHTML = `<span class="entered-val" style="font-size:2rem; font-weight:800; color:#06b6d4;">${val}</span>`;
                } else {
                    preview.innerHTML = `<span class="placeholder">Nhập hoặc vẽ câu trả lời...</span>`;
                }
            }

            // Tự động kiểm tra câu trả lời khi dùng Bàn phím số (Tab 1 Numpad)
            if (val !== '' && this.quizState.active && this.quizState.questions[this.quizState.currentQIndex]) {
                const currentQ = this.quizState.questions[this.quizState.currentQIndex];
                const userNum = parseInt(val, 10);
                const targetNum = currentQ.answer;

                // 1. Nhập đúng -> Tự động chuyển câu tiếp theo!
                if (userNum === targetNum) {
                    this.submitCurrentAnswer();
                } else {
                    // 2. Nhập sai và số chữ số nhập vào đã đạt hoặc vượt quá độ dài đáp án
                    const targetLen = targetNum.toString().length;
                    if (val.length >= targetLen) {
                        soundEngine.playWrong();
                        const card = document.getElementById('question-card');
                        if (card) {
                            card.classList.remove('wrong-flash');
                            void card.offsetWidth; // trigger reflow
                            card.classList.add('wrong-flash');
                        }
                        // Giữ nguyên giá trị và không chuyển câu để người dùng gõ sửa lại!
                    }
                }
            }
        }

        // ==========================================================================
        // 8. MATH QUIZ LIFECYCLE
        // ==========================================================================
        startQuiz() {
            const questions = [];
            for (let i = 0; i < this.config.questionCount; i++) {
                questions.push(MathGenerator.generate(this.config.opType));
            }

            this.quizState = {
                active: true, currentQIndex: 0, questions, userAnswers: [],
                correctCount: 0, wrongCount: 0, currentStreak: 0, maxStreak: 0,
                userAnswerInput: '', sessionTimerInterval: null,
                questionStartTime: Date.now(), sessionStartTime: Date.now()
            };

            this.switchScreen('quiz');
            this.startSessionTimer();
            this.loadQuestion(0);
        }

        startSessionTimer() {
            clearInterval(this.quizState.sessionTimerInterval);
            const timeEl = document.getElementById('quiz-total-time-text');
            const updateUI = () => {
                const elapsedSec = Math.floor((Date.now() - this.quizState.sessionStartTime) / 1000);
                const m = Math.floor(elapsedSec / 60);
                const s = elapsedSec % 60;
                if (timeEl) timeEl.textContent = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
            };
            updateUI();
            this.quizState.sessionTimerInterval = setInterval(updateUI, 1000);
        }

        loadQuestion(index) {
            if (index >= this.quizState.questions.length) {
                this.finishQuiz();
                return;
            }

            const q = this.quizState.questions[index];
            this.quizState.currentQIndex = index;
            this.quizState.userAnswerInput = '';
            this.setUserAnswer('');
            this.handwritingCanvas?.clear();

            const card = document.getElementById('question-card');
            if (card) card.classList.remove('correct-flash', 'wrong-flash');

            document.getElementById('quiz-progress-text').textContent = `Bài toán ${index + 1}/${this.config.questionCount}`;
            const pct = ((index + 1) / this.config.questionCount) * 100;
            document.getElementById('quiz-progress-fill').style.width = `${pct}%`;

            const streakBadge = document.getElementById('streak-badge');
            const streakCount = document.getElementById('streak-count');
            if (this.quizState.currentStreak >= 2) {
                streakBadge?.classList.remove('hidden');
                if (streakCount) streakCount.textContent = this.quizState.currentStreak;
            } else {
                streakBadge?.classList.add('hidden');
            }

            document.getElementById('op-type-tag').textContent = q.opName;
            document.getElementById('math-expr').textContent = q.exprStr;

            const mcqBtns = document.querySelectorAll('.mcq-option-btn');
            q.choices.forEach((choiceVal, idx) => {
                if (mcqBtns[idx]) {
                    mcqBtns[idx].textContent = choiceVal;
                    mcqBtns[idx].onclick = () => {
                        soundEngine.playClick();
                        this.setUserAnswer(choiceVal.toString());
                        this.submitCurrentAnswer();
                    };
                }
            });

            this.quizState.questionStartTime = Date.now();
        }

        skipCurrentQuestion() {
            this.recordQuestionResult(false, 'Bỏ qua', false);
        }

        async submitCurrentAnswer() {
            // Nếu ở Tab Viết tay và chưa bấm nhận diện nhưng đã vẽ nét ➔ Gọi AI trước khi gửi
            const canvasTab = document.getElementById('tab-canvas');
            if (canvasTab && canvasTab.classList.contains('active') && this.quizState.userAnswerInput === '') {
                if (this.handwritingCanvas && this.handwritingCanvas.strokes.length > 0) {
                    await this.handwritingCanvas.analyzeDigit();
                }
            }

            if (this.quizState.userAnswerInput === '') return;
            const userNum = parseInt(this.quizState.userAnswerInput, 10);
            const q = this.quizState.questions[this.quizState.currentQIndex];
            this.recordQuestionResult(userNum === q.answer, userNum.toString(), false);
        }

        recordQuestionResult(isCorrect, submittedAnsStr, isTimeout) {
            const timeSpentSec = ((Date.now() - this.quizState.questionStartTime) / 1000).toFixed(1);
            const q = this.quizState.questions[this.quizState.currentQIndex];

            this.quizState.userAnswers.push({
                question: q.exprStr, opName: q.opName, correctAnswer: q.answer,
                userAnswer: submittedAnsStr, isCorrect, isTimeout,
                timeSpentSec: parseFloat(timeSpentSec)
            });

            const card = document.getElementById('question-card');

            if (isCorrect) {
                soundEngine.playCorrect();
                this.quizState.correctCount++;
                this.quizState.currentStreak++;
                if (this.quizState.currentStreak > this.quizState.maxStreak) {
                    this.quizState.maxStreak = this.quizState.currentStreak;
                }
                if (card) card.classList.add('correct-flash');
                setTimeout(() => this.loadQuestion(this.quizState.currentQIndex + 1), 350);
            } else {
                if (!isTimeout) soundEngine.playWrong();
                this.quizState.wrongCount++;
                this.quizState.currentStreak = 0;
                if (card) card.classList.add('wrong-flash');
                // Giữ nguyên câu hỏi cho đến khi làm đúng!
            }
        }

        finishQuiz() {
            this.quizState.active = false;
            clearInterval(this.quizState.sessionTimerInterval);

            const sessionDurationSec = Math.round((Date.now() - this.quizState.sessionStartTime) / 1000);
            const totalQ = this.config.questionCount;
            const correct = this.quizState.correctCount;
            const accuracy = Math.round((correct / totalQ) * 100);

            const opNameMap = { mix: '🎲 Hỗn hợp', add: '+ Phép Cộng', sub: '- Phép Trừ', mul: '× Phép Nhân', div: '÷ Phép Chia' };

            const sessionRecord = {
                id: Date.now(),
                dateStr: new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
                opType: this.config.opType,
                opName: opNameMap[this.config.opType] || 'Bài tập',
                totalQuestions: totalQ,
                correctCount: correct,
                wrongCount: this.quizState.wrongCount,
                accuracy,
                totalTimeSeconds: sessionDurationSec,
                avgSpeed: (sessionDurationSec / totalQ).toFixed(1),
                maxStreak: this.quizState.maxStreak,
                questions: this.quizState.userAnswers
            };

            StatsManager.saveSession(sessionRecord);
            this.updateQuickStats();

            this.renderResultScreen(sessionRecord);
            this.switchScreen('result');
        }

        renderResultScreen(record) {
            document.getElementById('res-correct-count').textContent = `${record.correctCount} / ${record.totalQuestions}`;
            document.getElementById('res-accuracy-pct').textContent = `${record.accuracy}% chính xác`;

            const mins = Math.floor(record.totalTimeSeconds / 60);
            const secs = record.totalTimeSeconds % 60;
            document.getElementById('res-total-time').textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
            document.getElementById('res-avg-speed').textContent = `${record.avgSpeed}s`;
            document.getElementById('res-max-streak').textContent = `${record.maxStreak} 🔥`;

            const listContainer = document.getElementById('session-questions-list');
            if (listContainer) {
                listContainer.innerHTML = '';
                record.questions.forEach((qItem, idx) => {
                    const row = document.createElement('div');
                    row.className = `q-item-row ${qItem.isCorrect ? 'is-correct' : 'is-wrong'}`;
                    row.innerHTML = `
                        <div class="q-item-expr">Câu ${idx + 1}: ${qItem.question}</div>
                        <div class="q-item-ans">${qItem.isCorrect ? '✅ ' + qItem.userAnswer : '❌ ' + qItem.userAnswer + ' (Đúng: ' + qItem.correctAnswer + ')'}</div>
                        <div class="q-item-time">⏱️ ${qItem.timeSpentSec}s</div>
                    `;
                    listContainer.appendChild(row);
                });
            }
        }

        updateQuickStats() {
            const agg = StatsManager.getFilteredStats('day');
            document.getElementById('qs-total-games').textContent = `${agg.totalGames} phiên`;
            document.getElementById('qs-avg-acc').textContent = `${agg.avgAccuracy}%`;
            document.getElementById('qs-avg-speed').textContent = `${agg.avgSpeed}s/câu`;
        }

        // ==========================================================================
        // 9. STATS & CHART.JS TRACKING RENDERER
        // ==========================================================================
        renderStatsModal(filterType = 'day') {
            const stats = StatsManager.getFilteredStats(filterType);

            document.getElementById('modal-stat-games').textContent = stats.totalGames;
            document.getElementById('modal-stat-total-q').textContent = stats.totalQuestions;
            document.getElementById('modal-stat-acc').textContent = `${stats.avgAccuracy}%`;
            document.getElementById('modal-stat-speed').textContent = `${stats.avgSpeed}s`;

            const container = document.getElementById('history-list-container');
            if (container) {
                if (stats.filteredHistory.length === 0) {
                    container.innerHTML = `<div class="empty-history-text">Chưa có lịch sử làm bài. Hãy hoàn thành bài luyện tập đầu tiên!</div>`;
                } else {
                    container.innerHTML = '';
                    stats.filteredHistory.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'history-card';
                        card.innerHTML = `
                            <div class="hc-left">
                                <span class="hc-op">${item.opName} (${item.totalQuestions} câu/từ)</span>
                                <span class="hc-date">${item.dateStr}</span>
                            </div>
                            <div class="hc-right">
                                <span class="hc-score">${item.correctCount}/${item.totalQuestions} (${item.accuracy}%)</span>
                                <span class="hc-speed">⚡ ${item.avgSpeed}s/câu</span>
                            </div>
                        `;
                        container.appendChild(card);
                    });
                }
            }

            this.renderProgressChart();
            document.getElementById('stats-modal')?.classList.remove('hidden');
        }

        renderProgressChart() {
            const canvas = document.getElementById('progress-chart');
            if (!canvas || typeof Chart === 'undefined') return;

            const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
            const accuracyData = [78, 82, 85, 89, 93, 91, 96];
            const speedData = [3.1, 2.8, 2.6, 2.4, 2.2, 2.3, 2.0];

            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            const ctx = canvas.getContext('2d');
            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [
                        {
                            label: 'Tỉ Lệ Chính Xác (%)',
                            data: accuracyData,
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.2)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 4,
                            pointBackgroundColor: '#2563eb'
                        },
                        {
                            label: 'Tốc Độ (giây/câu)',
                            data: speedData,
                            borderColor: '#06b6d4',
                            backgroundColor: 'transparent',
                            borderDash: [5, 5],
                            tension: 0.4,
                            pointRadius: 4,
                            pointBackgroundColor: '#06b6d4'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 10 } }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 10 } }
                        },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 10 } }
                        }
                    }
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.app = new AppController();
    });
})();
