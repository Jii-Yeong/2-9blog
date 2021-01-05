import axios from "axios";

const LOGIN_REQUEST = 'login/REQUEST';
const LOGIN_SUCCESS = 'login/SUCCESS';
const LOGIN_FAILURE = 'login/FAILURE';

const LOGOUT_REQUEST = 'Logout/REQUEST';
const LOGOUT_SUCCESS = 'Logout/SUCCESS';
const LOGOUT_FAILURE = 'Logout/FAILURE';


// ----- 로그인 액션 -----
const requestLogin = () => ({
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
});

const receiveLogin = user => ({
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    email: user.email,
    username: user.username,
    token: user.token
});

const loginError = msg => ({
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    msg
});
// ----------------------


// ----- 로그아웃 액션 -----
const requestLogout = () => ({
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
});

const receiveLogout = () => ({
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
});
// ------------------------

// ----- 미들웨어? -----
export function loginUser(creds) {
    return async (dispatch) => {
        const url = '/users/login/';
        const options = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: creds.email,
                password: creds.password,
            }
        }

        dispatch(requestLogin(creds));

        const res = await axios(options);
        const data = res.data;

        if (res.statusText === "OK" && res.status === 200 && data.message === "ok") {
            dispatch(receiveLogin(data));
        } else {
            dispatch(loginError(data.message));
            throw new Error(data);
        }

        return data;
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        dispatch(receiveLogout());
    }
}
// --------------------


// ----- 리듀서 선언 -----
const initialState = {
    isFetching: false,
    isAuthenticated: false,
}

// Redux는 변경되지 않은 객체를 반환해야하므로
// Object.assing으로 빈 객체를 첫 번째 인수로 사용하여 반환 값이 고유한 객체인지 확인한다.
export default function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                email: action.email,
                username: action.username,
                token: action.token,
                errorMessage: '',
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.msg,
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                username: '',
                token: '',
            });
        default:
            return state;
    }
}
// ----------------------