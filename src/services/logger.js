const Logger = function (msg) {
  this.msgList = [msg];
  this.info = (...data) => {
    const [msg, values] = data;
    values ? this.msgList.push(`${msg}:${values}`) : this.msgList.push(msg);
    this.toString();
  }
  this.toString = () => {
    console.log(this.msgList.join('|'));
  }
}

module.exports = {
  Logger,
};
